import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {ReservationService} from "../../protected/dashboard/services/reservation.service";
import {Router} from "@angular/router";
import {DashboardComponent} from "../../protected/dashboard/dashboard.component";

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.css']
})
export class ReservationDialogComponent {
  startDate: Date;
  endDate: Date;
  deporteReserva: string;
  pistaReserva: string;

  usernameControl = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+([ ][a-zA-ZñÑáéíóúÁÉÍÓÚ]+)*$"), Validators.minLength(3)]);

  miFormulario: FormGroup = this.fb.group({
    username: this.usernameControl,
  });

  constructor( private fb: FormBuilder,
               private dialog: MatDialogRef<ReservationDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private reservationService: ReservationService,
               private router: Router) {
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.deporteReserva = data.deporteReserva;
    this.pistaReserva = data.pistaReserva;
  }

  onNoClick(): void {
    this.dialog.close();
  }

  getUsernameErrorMessage() {
    if (this.usernameControl.hasError('required')) {
      return 'Por favor indica tu nombre completo.';
    }

    if (this.usernameControl.hasError('minlength')) {
      return 'Nombre no válido.';
    }

    return this.usernameControl.hasError('pattern') ? 'Nombre no válido.' : '';
  }

  reservar() {
    if (this.miFormulario.valid) {
      const {username} = this.miFormulario.value;
      this.reservationService.reservar(username, this.deporteReserva, this.pistaReserva, this.startDate, this.endDate)
        .subscribe( ok => {
          if (ok === true) {
            Swal.fire('Éxito', 'Has realizado la reserva correctamente.', 'success');
          } else{
            Swal.fire('Error', 'Ha habido un error inesperado.', 'error');
          }
          this.onNoClick();
        });
    }
  }
}
