import {Component, ViewChild} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ReservationService} from "../dashboard/services/reservation.service";
import {MatSort} from "@angular/material/sort";
import {ReservationResponse} from "../../auth/interfaces/interfaces";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  nombre: string;
  correo: string;
  contrasena: string;

  emailControl = new FormControl('', [Validators.email]);
  password1Control = new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z0-9])(?=.*[\\W_])(?!.*\\s).{8,}$")]);
  password2Control = new FormControl('', [Validators.nullValidator, this.passwordMatchValidator]);


  miFormulario: FormGroup = this.fb.group({
    email: this.emailControl,
    password1: this.password1Control,
    password2: this.password2Control
  });

  hide1 = true;
  hide2 = true;

  // @ts-ignore
  numReservas: number;

  // @ts-ignore
  costeTotal: number;

  deporteFav: string = "Tenis";

  editar = false;

  // @ts-ignore
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'track', 'name', 'fechaCreated','fechaReserva', 'coste', 'estado', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private reservationService: ReservationService) {
    this.nombre = '';
    this.correo = '';
    this.contrasena = '';

    this.cargarReservas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.nombre = this.authService.usuario.username;
    this.correo = this.authService.usuario.email;
  }

  saveUser() {
    if (this.miFormulario.valid) {
      const {email, password1} = this.miFormulario.value;
      this.authService.saveUser(email, password1)
        .subscribe(ok => {
          if (ok === true) {
            Swal.fire('Éxito', 'Tus cambios se han guardado correctamente.', 'success');
            this.correo = this.authService.usuario.email;
          } else {
            Swal.fire('Error', ok, 'error');
          }
        });
    }

    this.miFormulario.reset();
  }

  parseDate(fechaOriginal: string) {
    const fecha = new Date(fechaOriginal);

    const year = fecha.getFullYear(); // obtener el año
    const month = String(fecha.getMonth() + 1).padStart(2, '0'); // obtener el mes y añadir un cero si es necesario
    const day = String(fecha.getDate()).padStart(2, '0'); // obtener el día y añadir un cero si es necesario
    const hour = String(fecha.getHours()).padStart(2, '0'); // obtener las horas y añadir un cero si es necesario
    const minutes = String(fecha.getMinutes()).padStart(2, '0'); // obtener los minutos y añadir un cero si es necesario

    const dateString = `${day}-${month}-${year} ${hour}:${minutes}`; // unir los valores en un string con el formato deseado

    return dateString;
  }

  parseReservationDate(fechaOriginal1: string, fechaOriginal2: string) {
    const fecha1 = new Date(fechaOriginal1);

    const fecha2 = new Date(fechaOriginal2);

    const year = fecha1.getFullYear(); // obtener el año
    const month = String(fecha1.getMonth() + 1).padStart(2, '0'); // obtener el mes y añadir un cero si es necesario
    const day = String(fecha1.getDate()).padStart(2, '0'); // obtener el día y añadir un cero si es necesario
    const hour = String(fecha1.getHours()).padStart(2, '0'); // obtener las horas y añadir un cero si es necesario
    const minutes = String(fecha1.getMinutes()).padStart(2, '0'); // obtener los minutos y añadir un cero si es necesario

    const hour2 = String(fecha2.getHours()).padStart(2, '0'); // obtener las horas y añadir un cero si es necesario
    const minutes2 = String(fecha2.getMinutes()).padStart(2, '0'); // obtener los minutos y añadir un cero si es necesario

    const dateString = `${day}-${month}-${year} ${hour}:${minutes} a ${hour2}:${minutes2}`; // unir los valores en un string con el formato deseado

    return dateString;
  }

  getEmailErrorMessage() {
    return this.emailControl.hasError('email') ? 'Email no válido.' : '';
  }

  getPassword1ErrorMessage() {
    return this.password1Control.hasError('pattern') ? 'Al menos 8 caracteres, incluyendo 1 carácter especial.' : '';
  }

  passwordMatchValidator(control: FormControl) {
    const password = control.root.get('password1');
    const confirmPassword = control.root.get('password2');

    if (password && confirmPassword) {
      return password.value === confirmPassword.value ? null : {passwordMismatch: true};
    }

    return null;
  }

  getPassword2ErrorMessage() {
    return this.password2Control.hasError('passwordMismatch') ? 'Las contraseñas no coinciden.' : '';
  }

  cancelar(reserva: ReservationResponse) {
    this.reservationService.cancelReservationById(reserva.id!).subscribe(
      ok => {
        if (ok) {
          Swal.fire('Éxito', 'La reserva ha sido cancelada.', 'success');
          this.cargarReservas();
        } else {
          Swal.fire('Error', ok, 'error');
        }
      });
  }

  pagar(reserva: ReservationResponse) {
    this.reservationService.payReservationById(reserva.id!).subscribe(
      ok => {
        if (ok) {
          Swal.fire('Éxito', 'Se ha efectuado el pago de la reserva.', 'success');
          this.cargarReservas();
        } else {
          Swal.fire('Error', ok, 'error');
        }
      });
  }


  cargarReservas() {
    const reservas = this.reservationService.getReservationsById(this.authService.usuario.id);

    reservas.subscribe(reservasGod => {
      // Inicializar la fuente de datos de la tabla con los datos obtenidos
      this.dataSource = new MatTableDataSource<any>(reservasGod.reverse());

      this.numReservas  = reservasGod.length

      var total = 0;
      reservasGod.forEach(function(reserva) {
        // Sumar el precio de cada reserva al costo total
        // @ts-ignore
        if (reserva.state !== "CANCELADA")
          total += reserva.cost!;
      });

      // @ts-ignore
      this.deporteFav = reservasGod[0].sport;
      this.costeTotal = total;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
