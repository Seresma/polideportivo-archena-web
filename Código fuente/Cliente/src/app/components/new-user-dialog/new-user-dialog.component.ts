import {Component, Inject} from '@angular/core';
import {Usuario} from "../../auth/interfaces/interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../auth/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.css']
})
export class NewUserDialogComponent {

  hide1 = true;

  rolSeleccionado: string = '';


  miFormulario: FormGroup = this.fb.group({
    email: [''], // Asigna un valor por defecto si deseas
    username: [''],
    password: [''], // Asigna un valor por defecto si deseas
    rol: [''] // Asigna un valor por defecto si deseas
  });

  constructor( private fb: FormBuilder,
               private dialog: MatDialogRef<NewUserDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private authService: AuthService) {
  }

  onNoClick(): void {
    this.dialog.close();
  }

  crear() {
    if (this.miFormulario.valid) {
      const {email, username, password, rol} = this.miFormulario.value;
      this.authService.createUser(email, username, password, rol)
        .subscribe( ok => {
          if (ok === true) {
            Swal.fire('Éxito', "Usuario creado correctamente", 'success');
          } else{
            Swal.fire('Error', ok, 'error');
          }
        });
    }
  }


}
