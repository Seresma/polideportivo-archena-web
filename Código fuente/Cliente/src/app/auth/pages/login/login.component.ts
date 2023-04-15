import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]+([a-zA-Z0-9]+)*$")]);
  password = new FormControl('', [Validators.required, Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$")]);
  hide = true;

  getUsernameErrorMessage() {
    if (this.username.hasError('required')) {
      return 'Por favor indica tu nombre de usuario.';
    }

    return this.username.hasError('pattern') ? 'Nombre de usuario no válido.' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Por favor indica tu contraseña.';
    }

    return this.password.hasError('pattern') ? 'Contraseña no válida.' : '';
  }
}
