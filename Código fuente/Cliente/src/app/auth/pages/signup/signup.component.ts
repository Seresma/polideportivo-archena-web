import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]+([a-zA-Z0-9]+)*$")]);
  password1 = new FormControl('', [Validators.required, Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$")]);
  password2 = new FormControl('', [Validators.required]);
  hide1 = true;
  hide2 = true;

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Por favor indica tu email.';
    }

    return this.email.hasError('email') ? 'Email no válido.' : '';
  }

  getUsernameErrorMessage() {
    if (this.username.hasError('required')) {
      return 'Por favor indica tu nombre de usuario.';
    }

    return this.username.hasError('pattern') ? 'Nombre de usuario no válido.' : '';
  }

  getPassword1ErrorMessage() {
    if (this.password1.hasError('required')) {
      return 'Por favor indica tu contraseña.';
    }

    return this.password1.hasError('pattern') ? 'Contraseña no válida.' : '';
  }

  getPassword2ErrorMessage() {
    if (this.password2.hasError('required')) {
      return 'Por favor confirma la contraseña.';
    };

    return this.password1.hasError('pattern') ? 'Contraseña no válida.' : '';
  }


}
