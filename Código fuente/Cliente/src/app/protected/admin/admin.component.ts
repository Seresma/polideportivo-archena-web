import {Component, ViewChild} from '@angular/core';
import {DateAdapter} from "@angular/material/core";
import {Instalacion, ReservationResponse, Usuario} from "../../auth/interfaces/interfaces";
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
import {InstalationService} from "../dashboard/services/instalation.service";
import {
  EditInstalationDialogComponent
} from "../../components/edit-instalation-dialog/edit-instalation-dialog.component";
import {NewInstalationDialogComponent} from "../../components/new-instalation-dialog/new-instalation-dialog.component";

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

  displayedColumnsUsers: string[] = ['username', 'email', 'role', 'actions'];
  // @ts-ignore
  dataSourceUsers: MatTableDataSource<any>;

  // @ts-ignore
  dataSourceInstalaciones: MatTableDataSource<any>;

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

  @ViewChild(MatPaginator) paginatorUsers!: MatPaginator;

  @ViewChild(MatSort) sortUsers!: MatSort;

  displayedColumnsInst: string[] = ['inst_name', 'inst_sport', 'inst_init', 'inst_end', 'inst_intervals', 'inst_cost', 'inst_actions'];

  @ViewChild(MatPaginator) paginatorInst!: MatPaginator;

  @ViewChild(MatSort) sortInst!: MatSort;

  pistaFutbol = 'Campo municipal de fútbol "Andrés Abenza"';

  pistaTenis = 'Pista dura';

  pistaBaloncesto = 'Pabellón municipal de deportes';

  pistaFronton = 'Pista municipal de frontón';

  pistaNatacion = 'Piscina municipal climatizada';

  // @ts-ignore
  @ViewChild(MatPaginator) paginatorReserv: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sortReserv: MatSort;

  constructor(private dateAdapter: DateAdapter<Date>,
              private authService: AuthService,
              private dialog: MatDialog,
              private reservationService: ReservationService,
              private instalacionService: InstalationService) {

    this.dateAdapter.setLocale('es');
    this.dateAdapter.getFirstDayOfWeek = () => {
      return 1;
    }

    const usuarios = authService.getUsers();

    usuarios.subscribe(usuariosGod => {
      // Inicializar la fuente de datos de la tabla con los datos obtenidos
      this.dataSourceUsers = new MatTableDataSource<any>(usuariosGod.reverse());

      this.numUsuarios = usuariosGod.length;

      listaUsuarios = usuariosGod;
    });

    this.cargarReservasTotales();

    this.dataSourceInstalaciones = new MatTableDataSource<any>(this.instalacionService.getInstalaciones());
  }

  ngAfterViewInit() {
    this.dataSourceUsers.paginator = this.paginatorUsers;
    this.dataSourceUsers.sort = this.sortUsers;
    this.dataSourceReservas.paginator = this.paginatorReserv;
    this.dataSourceReservas.sort = this.sortReserv;
    this.dataSourceInstalaciones.paginator = this.paginatorInst;
    this.dataSourceInstalaciones.sort = this.sortInst;
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
            this.dataSourceReservas.paginator = this.paginatorReserv;
            this.dataSourceReservas.sort = this.sortReserv;
          });
        break;
      case 'Tenis':
        this.esperarAleatorio();
        this.reservationService.getReservations(this.parseDate(), this.pistaTenis)
          .subscribe(reservations => {
            this.dataSourceReservas = new MatTableDataSource<any>(reservations.reverse());
            this.dataSourceReservas.paginator = this.paginatorReserv;
            this.dataSourceReservas.sort = this.sortReserv;
          });
        break;
      case 'Baloncesto':
        this.esperarAleatorio();
        this.reservationService.getReservations(this.parseDate(), this.pistaBaloncesto)
          .subscribe(reservations => {
            this.dataSourceReservas = new MatTableDataSource<any>(reservations.reverse());
            this.dataSourceReservas.paginator = this.paginatorReserv;
            this.dataSourceReservas.sort = this.sortReserv;
          });
        break;
      case 'Frontón':
        this.esperarAleatorio();
        this.reservationService.getReservations(this.parseDate(), this.pistaFronton)
          .subscribe(reservations => {
            this.dataSourceReservas = new MatTableDataSource<any>(reservations.reverse());
            this.dataSourceReservas.paginator = this.paginatorReserv;
            this.dataSourceReservas.sort = this.sortReserv;
          });
        break;
      case 'Natación':
        this.esperarAleatorio();
        this.reservationService.getReservations(this.parseDate(), this.pistaNatacion)
          .subscribe(reservations => {
            this.dataSourceReservas = new MatTableDataSource<any>(reservations.reverse());
            this.dataSourceReservas.paginator = this.paginatorReserv;
            this.dataSourceReservas.sort = this.sortReserv;
          });
        break;
      default:
        this.esperarAleatorio();
        this.reservationService.getAllReservationsByDay(this.parseDate())
          .subscribe(reservas => {
            this.dataSourceReservas = new MatTableDataSource<any>(reservas.reverse());
            this.dataSourceReservas.paginator = this.paginatorReserv;
            this.dataSourceReservas.sort = this.sortReserv;
          });
        break;
    }
  }

  eliminarUsuario(user: Usuario, index: number) {
    this.authService.deleteUser(user.id).subscribe(() => Swal.fire('Éxito', "Usuario eliminado correctamente.", 'success'));
    this.dataSourceUsers = new MatTableDataSource<any>(listaUsuarios.slice(0, index).concat(listaUsuarios.slice(index + 1)));
    this.dataSourceUsers.paginator = this.paginatorUsers;
    this.dataSourceUsers.sort = this.sortUsers;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUsers.filter = filterValue.trim().toLowerCase();
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
        this.dataSourceUsers = new MatTableDataSource<any>(usuariosGod.reverse());

        this.numUsuarios = usuariosGod.length;

        listaUsuarios = usuariosGod;

        // Conectar el paginador a la fuente de datos
        this.dataSourceUsers.paginator = this.paginatorUsers;
        this.dataSourceUsers.sort = this.sortUsers;
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
        this.dataSourceUsers = new MatTableDataSource<any>(usuariosGod.reverse());

        this.numUsuarios = usuariosGod.length;

        listaUsuarios = usuariosGod;

        // Conectar el paginador a la fuente de datos
        this.dataSourceUsers.paginator = this.paginatorUsers;
        this.dataSourceUsers.sort = this.sortUsers;
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

  applyFilterReserva(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceReservas.filter = filterValue.trim().toLowerCase();
  }

  applyFilterInstalaciones(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceInstalaciones.filter = filterValue.trim().toLowerCase();
  }

  eliminarInstalacion(index: number) {
    Swal.fire('Éxito', "Instalación eliminada correctamente.", 'success');
    this.instalacionService.eliminarInstalacion(index);
    this.dataSourceInstalaciones = new MatTableDataSource<any>(this.instalacionService.getInstalaciones());
  }

  openEditInstalationDialog(instalacion: Instalacion, i: number) {

    const dialogRef = this.dialog.open(EditInstalationDialogComponent, {
      width: '700px',
      data: {
        instalacion: instalacion,
        index: i
      }
    });
  }

  openNewInstalacionDialog() {
    const dialogRef = this.dialog.open(NewInstalationDialogComponent, {
      width: '700px',
    });

    setTimeout(() => {
      this.dataSourceInstalaciones = new MatTableDataSource<any>(this.instalacionService.getInstalaciones());
      // Aquí puedes poner el código que deseas ejecutar después de los 5 segundos
    }, 30000);
  }

}
