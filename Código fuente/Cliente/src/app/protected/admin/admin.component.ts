import {Component, ViewChild} from '@angular/core';
import {DateAdapter} from "@angular/material/core";
import {ReservationResponse, Usuario} from "../../auth/interfaces/interfaces";
import {MatTableDataSource} from "@angular/material/table";
import {AuthService} from "../../auth/services/auth.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import Swal from "sweetalert2";
import {ReservationDialogComponent} from "../../components/reservation-dialog/reservation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EditUserDialogComponent} from "../../components/edit-user-dialog/edit-user-dialog.component";
import {NewUserDialogComponent} from "../../components/new-user-dialog/new-user-dialog.component";
import {ReservationService} from "../dashboard/services/reservation.service";

let listaUsuarios: Usuario[] = [];


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  deportes = ['Todos', 'Fútbol', 'Tenis', 'Natación', 'Frontón', 'Baloncesto'];
  deporteElegido = 'Todos';
  fechaElegida = new Date();

  fechaBuscada = new Date();
  deporteBuscado = '';

  displayedColumns: string[] = ['username', 'email', 'role', 'actions'];
  // @ts-ignore
  dataSource: MatTableDataSource<any>;

  // @ts-ignore
  numUsuarios: number;

  // @ts-ignore
  numReservas: number;

  // @ts-ignore
  costeTotal: number;

  deporteFav: string = "Tenis";

  isLoading = false;

  // @ts-ignore
  dataSourceReservas: MatTableDataSource<any>;
  displayedColumnsReservas: string[] = ['id', 'track', 'name', 'fechaCreated', 'fechaReserva', 'coste', 'estado', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  reservasTotales: ReservationResponse[] = [];
  pistaFutbol = 'Campo municipal de fútbol "Andrés Abenza"';

  pistaTenis = 'Pista dura';

  pistaBaloncesto = 'Pabellón municipal de deportes';

  pistaFronton = 'Pista municipal de frontón';

  pistaNatacion = 'Piscina municipal climatizada';

  // @ts-ignore
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort2: MatSort;

  constructor(private dateAdapter: DateAdapter<Date>,
              private authService: AuthService,
              private dialog: MatDialog,
              private reservationService: ReservationService) {

    this.dateAdapter.setLocale('es');
    this.dateAdapter.getFirstDayOfWeek = () => {
      return 1;
    }

    const usuarios = authService.getUsers();

    usuarios.subscribe(usuariosGod => {
      // Inicializar la fuente de datos de la tabla con los datos obtenidos
      this.dataSource = new MatTableDataSource<any>(usuariosGod.reverse());

      this.numUsuarios = usuariosGod.length

      // Conectar el paginador a la fuente de datos
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.cargarReservasTotales();
  }

  ngAfterViewInit() {
    this.dataSourceReservas.paginator = this.paginator2;
    this.dataSourceReservas.sort = this.sort2;
  }


  buscar() {
    this.fechaBuscada = this.fechaElegida;
    this.deporteBuscado = this.deporteElegido;

    switch (this.deporteBuscado) {
      case 'Fútbol':
        this.esperarAleatorio();
        this.reservationService.getReservations(this.parseDate(), this.pistaFutbol)
          .subscribe(reservations => {
            this.dataSourceReservas = new MatTableDataSource<any>(reservations.reverse());
          });
        break;
      case 'Tenis':
        this.esperarAleatorio();
        this.reservationService.getReservations(this.parseDate(), this.pistaTenis)
          .subscribe(reservations => {
            this.dataSourceReservas = new MatTableDataSource<any>(reservations.reverse());
          });
        break;
      case 'Baloncesto':
        this.esperarAleatorio();
        this.reservationService.getReservations(this.parseDate(), this.pistaBaloncesto)
          .subscribe(reservations => {
            this.dataSourceReservas = new MatTableDataSource<any>(reservations.reverse());
          });
        break;
      case 'Frontón':
        this.esperarAleatorio();
        this.reservationService.getReservations(this.parseDate(), this.pistaFronton)
          .subscribe(reservations => {
            this.dataSourceReservas = new MatTableDataSource<any>(reservations.reverse());
          });
        break;
      case 'Natación':
        this.esperarAleatorio();
        this.reservationService.getReservations(this.parseDate(), this.pistaNatacion)
          .subscribe(reservations => {
            this.dataSourceReservas = new MatTableDataSource<any>(reservations.reverse());
          });
        break;
      default:
        this.esperarAleatorio();
        this.reservationService.getAllReservationsByDay(this.parseDate())
          .subscribe(reservas => {
            this.dataSourceReservas = new MatTableDataSource<any>(reservas.reverse());
          });
        break;
    }
  }

  eliminarUsuario(user: Usuario, index: number) {
    this.authService.deleteUser(user.id).subscribe(() => Swal.fire('Éxito', "Usuario eliminado correctamente", 'success'));
    this.dataSource = new MatTableDataSource<any>(listaUsuarios.slice(0, index).concat(listaUsuarios.slice(index + 1)));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditUserDialog(usuario: Usuario) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '700px',
      data: {
        user: usuario
      }
    });

    setTimeout(() => {
      const usuarios = this.authService.getUsers();

      usuarios.subscribe(usuariosGod => {
        // Inicializar la fuente de datos de la tabla con los datos obtenidos
        this.dataSource = new MatTableDataSource<any>(usuariosGod.reverse());

        this.numUsuarios = usuariosGod.length

        // Conectar el paginador a la fuente de datos
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      // Aquí puedes poner el código que deseas ejecutar después de los 5 segundos
    }, 15000);

  }

  openNewUserDialog() {
    const dialogRef = this.dialog.open(NewUserDialogComponent, {
      width: '700px',
    });

    setTimeout(() => {
      const usuarios = this.authService.getUsers();

      usuarios.subscribe(usuariosGod => {
        // Inicializar la fuente de datos de la tabla con los datos obtenidos
        this.dataSource = new MatTableDataSource<any>(usuariosGod.reverse());

        this.numUsuarios = usuariosGod.length

        // Conectar el paginador a la fuente de datos
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      // Aquí puedes poner el código que deseas ejecutar después de los 5 segundos
    }, 15000);
  }

  esperarAleatorio() {
    this.isLoading = true;
    const randomDelay = Math.random();

    // Convertir el valor aleatorio a milisegundos
    const delayInMs = randomDelay * 1500;

    // Ejecutar una función después del tiempo aleatorio
    setTimeout(() => {
      this.isLoading = false;
    }, delayInMs);
  }

  parseDate() {
    const year = this.fechaBuscada.getFullYear(); // obtener el año
    const month = String(this.fechaBuscada.getMonth() + 1).padStart(2, '0'); // obtener el mes y añadir un cero si es necesario
    const day = String(this.fechaBuscada.getDate()).padStart(2, '0'); // obtener el día y añadir un cero si es necesario
    const dateString = `${year}-${month}-${day}`; // unir los valores en un string con el formato deseado

    return dateString;
  }

  parseDate2(fechaOriginal: string) {
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
    switch (this.deporteBuscado) {
      case 'Fútbol':
        this.reservationService.getReservations(this.parseDate(), this.pistaFutbol)
          .subscribe(reservations => {
            this.dataSourceReservas = new MatTableDataSource<any>(reservations.reverse());
          });
        break;
      case 'Tenis':
        this.reservationService.getReservations(this.parseDate(), this.pistaTenis)
          .subscribe(reservations => {
            this.dataSourceReservas = new MatTableDataSource<any>(reservations.reverse());
          });
        break;
      case 'Baloncesto':
        this.reservationService.getReservations(this.parseDate(), this.pistaBaloncesto)
          .subscribe(reservations => {
            this.dataSourceReservas = new MatTableDataSource<any>(reservations.reverse());
          });
        break;
      case 'Frontón':
        this.reservationService.getReservations(this.parseDate(), this.pistaFronton)
          .subscribe(reservations => {
            this.dataSourceReservas = new MatTableDataSource<any>(reservations.reverse());
          });
        break;
      case 'Natación':
        this.reservationService.getReservations(this.parseDate(), this.pistaNatacion)
          .subscribe(reservations => {
            this.dataSourceReservas = new MatTableDataSource<any>(reservations.reverse());
          });
        break;
      default:
        this.reservationService.getAllReservationsByDay(this.parseDate())
          .subscribe(reservas => {
            this.dataSourceReservas = new MatTableDataSource<any>(reservas.reverse());
          });
        break;
    }
  }

  cargarReservasTotales() {
    this.reservationService.getAllReservations()
      .subscribe(reservas => {
        this.numReservas = reservas.length;

        var total = 0;
        reservas.forEach(function (reserva) {
          // Sumar el precio de cada reserva al costo total
          // @ts-ignore
          if (reserva.state !== "CANCELADA")
            total += reserva.cost!;
        });

        // @ts-ignore
        this.deporteFav = reservas[0].sport;
        this.costeTotal = total;
      });
  }

}
