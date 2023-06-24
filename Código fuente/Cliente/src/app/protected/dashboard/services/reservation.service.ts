import {Injectable} from "@angular/core";
import {ReservationSlot} from "../interfaces/interfaces";
import {ReservationResponse} from "../../../auth/interfaces/interfaces";
import {catchError, map, Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import Swal from "sweetalert2";

@Injectable({providedIn: 'root'})
export class ReservationService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getFutbolSlots(sport: string, date: Date, reservations: ReservationResponse[]): ReservationSlot[] {
    // Obtiene las horas disponibles para reservar para el deporte y fecha seleccionados
    // en intervalos de hora y media desde las 9:00 hasta las 23:00
    const availableSlots: ReservationSlot[] = [];
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 17);
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23);
    for (let time = start; time < end; time.setMinutes(time.getMinutes() + 60)) {

      const slotStart = new Date(time);
      const slotEnd = new Date(time.getTime() + 60 * 60 * 1000);

      // Comprueba si ya hay una reserva en este slot
      const isReserved = reservations.some(reservation => {
        const reservationStartDate = new Date(reservation.startDate!);
        const reservationEndDate = new Date(reservation.endDate!);

        return slotStart.getTime() === reservationStartDate.getTime() && slotEnd.getTime() === reservationEndDate.getTime() && reservation.state !== "CANCELADA";
      });

      availableSlots.push({
        start: slotStart,
        end: slotEnd,
        isReserved: isReserved
      });
    }

    return availableSlots;
  }

  getTenisSlots(sport: string, date: Date, reservations: ReservationResponse[]): ReservationSlot[] {
    // Obtiene las horas disponibles para reservar para el deporte y fecha seleccionados
    // en intervalos de hora y media desde las 9:00 hasta las 23:00
    const availableSlots: ReservationSlot[] = [];
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9);
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 15);
    for (let time = start; time < end; time.setMinutes(time.getMinutes() + 60)) {

      const slotStart = new Date(time);
      const slotEnd = new Date(time.getTime() + 60 * 60 * 1000);

      // Comprueba si ya hay una reserva en este slot
      const isReserved = reservations.some(reservation => {
        const reservationStartDate = new Date(reservation.startDate!);
        const reservationEndDate = new Date(reservation.endDate!);

        return slotStart.getTime() === reservationStartDate.getTime() && slotEnd.getTime() === reservationEndDate.getTime() && reservation.state !== "CANCELADA";
      });

      availableSlots.push({
        start: slotStart,
        end: slotEnd,
        isReserved: isReserved
      });
    }

    return availableSlots;
  }

  getBaloncestoSlots(sport: string, date: Date, reservations: ReservationResponse[]): ReservationSlot[] {
    // Obtiene las horas disponibles para reservar para el deporte y fecha seleccionados
    // en intervalos de hora y media desde las 9:00 hasta las 23:00
    const availableSlots: ReservationSlot[] = [];
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 17);
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23);
    for (let time = start; time < end; time.setMinutes(time.getMinutes() + 60)) {

      const slotStart = new Date(time);
      const slotEnd = new Date(time.getTime() + 60 * 60 * 1000);

      // Comprueba si ya hay una reserva en este slot
      const isReserved = reservations.some(reservation => {
        const reservationStartDate = new Date(reservation.startDate!);
        const reservationEndDate = new Date(reservation.endDate!);

        return slotStart.getTime() === reservationStartDate.getTime() && slotEnd.getTime() === reservationEndDate.getTime() && reservation.state !== "CANCELADA";
      });

      availableSlots.push({
        start: slotStart,
        end: slotEnd,
        isReserved: isReserved
      });
    }

    return availableSlots;
  }

  getFrontonSlots(sport: string, date: Date, reservations: ReservationResponse[]): ReservationSlot[] {
    // Obtiene las horas disponibles para reservar para el deporte y fecha seleccionados
    // en intervalos de hora y media desde las 9:00 hasta las 23:00
    const availableSlots: ReservationSlot[] = [];
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9);
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 15);
    for (let time = start; time < end; time.setMinutes(time.getMinutes() + 60)) {

      const slotStart = new Date(time);
      const slotEnd = new Date(time.getTime() + 60 * 60 * 1000);

      // Comprueba si ya hay una reserva en este slot
      const isReserved = reservations.some(reservation => {
        const reservationStartDate = new Date(reservation.startDate!);
        const reservationEndDate = new Date(reservation.endDate!);

        return slotStart.getTime() === reservationStartDate.getTime() && slotEnd.getTime() === reservationEndDate.getTime() && reservation.state !== "CANCELADA";
      });

      availableSlots.push({
        start: slotStart,
        end: slotEnd,
        isReserved: isReserved
      });
    }

    return availableSlots;
  }

  getNatacionSlots(sport: string, date: Date, reservations: ReservationResponse[]): ReservationSlot[] {
    // Obtiene las horas disponibles para reservar para el deporte y fecha seleccionados
    // en intervalos de hora y media desde las 9:00 hasta las 23:00
    const availableSlots: ReservationSlot[] = [];
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 16);
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 22);
    for (let time = start; time < end; time.setMinutes(time.getMinutes() + 60)) {

      const slotStart = new Date(time);
      const slotEnd = new Date(time.getTime() + 60 * 60 * 1000);

      // Comprueba si ya hay una reserva en este slot
      const isReserved = reservations.some(reservation => {
        const reservationStartDate = new Date(reservation.startDate!);
        const reservationEndDate = new Date(reservation.endDate!);

        return slotStart.getTime() === reservationStartDate.getTime() && slotEnd.getTime() === reservationEndDate.getTime() && reservation.state !== "CANCELADA";
      });

      availableSlots.push({
        start: slotStart,
        end: slotEnd,
        isReserved: isReserved
      });
    }

    return availableSlots;
  }

  getReservations(date: string, track: string): Observable<ReservationResponse[]> {
    const url = `${this.baseUrl}/reservas?day=${date}&track=${track}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');

    return this.http.get<ReservationResponse[]>(url, {headers});
  }

  getReservationsById(id: number): Observable<ReservationResponse[]> {
    const url = `${this.baseUrl}/reservasUsuario?id=${id}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');

    return this.http.get<ReservationResponse[]>(url, {headers});
  }

  cancelReservationById(id: number): Observable<ReservationResponse> {
    const url = `${this.baseUrl}/cancelarReserva?id=${id}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');

    return this.http.put<ReservationResponse>(url, {headers});
  }

  payReservationById(id: number): Observable<ReservationResponse> {
    const url = `${this.baseUrl}/pagarReserva?id=${id}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');

    return this.http.put<ReservationResponse>(url, {headers});
  }

  reservar(nombre: string, deporte: string, pista: string, fechaInicio: Date, fechaFin: Date) {
    const url = `${this.baseUrl}/reservar`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');
    const body: ReservationResponse =
      {
        name: nombre,
        sport: deporte,
        track: pista,
        startDate: fechaInicio,
        endDate: fechaFin
      };

    return this.http.post<ReservationResponse>(url, body, {headers})
      .pipe(
        map(resp => resp.id! !== undefined),
        catchError(err => of(false)));
  }


  getAllReservationsByDay(date: string): Observable<ReservationResponse[]> {
    const url = `${this.baseUrl}/reservasAll?day=${date}`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');

    return this.http.get<ReservationResponse[]>(url, {headers});
  }

  getAllReservations() {
    const url = `${this.baseUrl}/reservasTodas`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '');

    return this.http.get<ReservationResponse[]>(url, {headers});
  }
}
