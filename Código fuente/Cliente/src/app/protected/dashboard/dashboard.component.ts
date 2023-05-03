import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/services/auth.service";
import {HttpClient} from "@angular/common/http";
import {DateAdapter} from "@angular/material/core";
import {ReservationSlot} from "./interfaces/interfaces";
import {ReservationService} from "./services/reservation.service";
import {MatDialog} from "@angular/material/dialog";
import {ReservationDialogComponent} from "../../components/reservation-dialog/reservation-dialog.component";
import {ReservationResponse} from "../../auth/interfaces/interfaces";
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  deportes = ['Todos', 'Fútbol', 'Tenis', 'Natación', 'Frontón', 'Baloncesto'];
  deporteElegido = 'Todos';
  fechaMinima: Date;
  fechaElegida = new Date();
  fechaMaxima: Date;

  fechaBuscada = new Date();
  deporteBuscado = '';

  fechaReservaInicio = new Date();
  fechaReservaFinal = new Date();
  deporteReserva = '';
  pistaReserva = '';

  @Input() futbolSlots: ReservationSlot[] = []

  @Input() tenisSlots: ReservationSlot[] = []

  @Input() baloncestoSlots: ReservationSlot[] = []

  @Input() frontonSlots: ReservationSlot[] = []

  @Input() natacionSlots: ReservationSlot[] = []

  futbolReservations: ReservationResponse[] = [];
  pistaFutbol = 'Campo municipal de fútbol "Andrés Abenza"';

  tenisReservations: ReservationResponse[] = [];
  pistaTenis = 'Pista dura';

  baloncestoReservations: ReservationResponse[] = [];
  pistaBaloncesto = 'Pabellón municipal de deportes';

  frontonReservations: ReservationResponse[] = [];
  pistaFronton = 'Pista municipal de frontón';

  natacionReservations: ReservationResponse[] = [];
  pistaNatacion = 'Piscina municipal climatizada';

  constructor(private router: Router,
              private dateAdapter: DateAdapter<Date>,
              private reservationService: ReservationService,
              private dialog: MatDialog) {

    this.dateAdapter.setLocale('es');
    this.dateAdapter.getFirstDayOfWeek = () => {
      return 1;
    }

    this.fechaMinima = new Date();
    this.fechaMaxima = new Date();
    this.fechaMaxima.setDate(this.fechaMinima.getDate() + 13);
  }

  buscar() {
    this.fechaBuscada = this.fechaElegida;
    this.deporteBuscado = this.deporteElegido;

    switch (this.deporteBuscado) {
      case 'Fútbol':
        this.reservationService.getReservations(this.parseDate(), this.pistaFutbol)
          .subscribe(reservations => {
            this.futbolSlots = this.reservationService.getFutbolSlots(this.deporteBuscado, this.fechaBuscada, reservations);
          });
        break;
      case 'Tenis':
        this.reservationService.getReservations(this.parseDate(), this.pistaTenis)
          .subscribe(reservations => {
            this.tenisSlots = this.reservationService.getTenisSlots(this.deporteBuscado, this.fechaBuscada, reservations);
          });
        break;
      case 'Baloncesto':
        this.reservationService.getReservations(this.parseDate(), this.pistaBaloncesto)
          .subscribe(reservations => {
            this.baloncestoSlots = this.reservationService.getBaloncestoSlots(this.deporteBuscado, this.fechaBuscada, reservations);
          });
        break;
      case 'Frontón':
        this.reservationService.getReservations(this.parseDate(), this.pistaFronton)
          .subscribe(reservations => {
            this.frontonSlots = this.reservationService.getFrontonSlots(this.deporteBuscado, this.fechaBuscada, reservations);
          });
        break;
      case 'Natación':
        this.reservationService.getReservations(this.parseDate(), this.pistaNatacion)
          .subscribe(reservations => {
            this.natacionSlots = this.reservationService.getNatacionSlots(this.deporteBuscado, this.fechaBuscada, reservations);
          });
        break;
      default:
        this.reservationService.getReservations(this.parseDate(), this.pistaFutbol)
          .subscribe(reservations => {
            this.futbolSlots = this.reservationService.getFutbolSlots(this.deporteBuscado, this.fechaBuscada, reservations);
          });
        this.reservationService.getReservations(this.parseDate(), this.pistaTenis)
          .subscribe(reservations => {
            this.tenisSlots = this.reservationService.getTenisSlots(this.deporteBuscado, this.fechaBuscada, reservations);
          });
        this.reservationService.getReservations(this.parseDate(), this.pistaBaloncesto)
          .subscribe(reservations => {
            this.baloncestoSlots = this.reservationService.getBaloncestoSlots(this.deporteBuscado, this.fechaBuscada, reservations);
          });
        this.reservationService.getReservations(this.parseDate(), this.pistaFronton)
          .subscribe(reservations => {
            this.frontonSlots = this.reservationService.getFrontonSlots(this.deporteBuscado, this.fechaBuscada, reservations);
          });
        this.reservationService.getReservations(this.parseDate(), this.pistaNatacion)
          .subscribe(reservations => {
            this.natacionSlots = this.reservationService.getNatacionSlots(this.deporteBuscado, this.fechaBuscada, reservations);
          });
        break;
    }
  }

  openDialog(startDate: Date, endDate: Date, deporte: string, pista: string) {
    this.fechaReservaInicio = startDate;
    this.fechaReservaFinal = endDate;
    this.deporteReserva = deporte;
    this.pistaReserva = pista;


    const dialogRef = this.dialog.open(ReservationDialogComponent, {
      width: '700px',
      data: {
        startDate: this.fechaReservaInicio,
        endDate: this.fechaReservaFinal,
        deporteReserva: this.deporteReserva,
        pistaReserva: this.pistaReserva,
      }
    });
  }


  parseDate() {
    const year = this.fechaBuscada.getFullYear(); // obtener el año
    const month = String(this.fechaBuscada.getMonth() + 1).padStart(2, '0'); // obtener el mes y añadir un cero si es necesario
    const day = String(this.fechaBuscada.getDate()).padStart(2, '0'); // obtener el día y añadir un cero si es necesario
    const dateString = `${year}-${month}-${day}`; // unir los valores en un string con el formato deseado

    return dateString;
  }


}
