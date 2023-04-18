import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usernameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);

  miFormulario: FormGroup = this.fb.group({
    username: this.usernameControl,
    password: this.passwordControl
  });


  hide = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
  }

  login() {
    if (this.miFormulario.valid) {
      const {username, password} = this.miFormulario.value;
      this.authService.login(username, password)
        .subscribe( ok => {
          if (ok === true) {
            this.router.navigateByUrl('/dashboard')
          } else{
            Swal.fire('Error', 'Nombre de usuario o contraseña incorrectos.', 'error');
          }
        });
    }
  }

  getUsernameErrorMessage() {
    return this.usernameControl.hasError('required') ? 'Por favor indica tu nombre de usuario.' : '';
  }

  getPasswordErrorMessage() {
    return this.passwordControl.hasError('required') ? 'Por favor indica tu contraseña.' : '';
  }

}
