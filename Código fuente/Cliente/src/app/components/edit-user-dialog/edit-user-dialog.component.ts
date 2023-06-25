import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ReservationService} from "../../protected/dashboard/services/reservation.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {AuthService} from "../../auth/services/auth.service";
import {Usuario} from "../../auth/interfaces/interfaces";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent {

  user: Usuario;

  hide1 = true;

  rolSeleccionado: string = '';


  miFormulario: FormGroup = this.fb.group({
    email: [''], // Asigna un valor por defecto si deseas
    password: [''], // Asigna un valor por defecto si deseas
    rol: [''] // Asigna un valor por defecto si deseas
  });

  constructor( private fb: FormBuilder,
               private dialog: MatDialogRef<EditUserDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private authService: AuthService) {

    this.user = data.user;
    this.rolSeleccionado = data.user.role
  }

  onNoClick(): void {
    this.dialog.close();
  }

  editar() {
    const {email, password, rol} = this.miFormulario.value;
    this.authService.editUser(this.user.id, email, password, rol)
      .subscribe(ok => {
        if (ok === true) {
          Swal.fire('Éxito', 'Tus cambios se han guardado correctamente.', 'success');
        } else {
          Swal.fire('Error', ok, 'error');
        }
      });
  }
}
