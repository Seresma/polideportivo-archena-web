import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  usernameControl = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]+([a-zA-Z0-9]+)*$"), Validators.minLength(3)]);
  password1Control = new FormControl('', [Validators.required, Validators.pattern("^(?=.*[a-zA-Z])(?=.*[\\W_])(?!.*\\s).{8,}$")]);
  password2Control = new FormControl('', [Validators.required, this.passwordMatchValidator]);


  miFormulario: FormGroup = this.fb.group({
    email: this.emailControl,
    username: this.usernameControl,
    password1: this.password1Control,
    password2: this.password2Control
  });

  hide1 = true;
  hide2 = true;

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService) {
  }

  signup() {
    if (this.miFormulario.valid) {
      const {email, username, password1} = this.miFormulario.value;
      this.authService.signup(email, username, password1,"USER")
        .subscribe( ok => {
          if (ok === true) {
            this.router.navigateByUrl('/alquilar_pistas')
          } else{
            Swal.fire('Error', ok, 'error');
          }
        });
    }
  }

  getEmailErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'Por favor indica tu email.';
    }
    return this.emailControl.hasError('email') ? 'Email no válido.' : '';
  }

  getUsernameErrorMessage() {
    if (this.usernameControl.hasError('required')) {
      return 'Por favor indica tu nombre de usuario.';
    }

    if (this.usernameControl.hasError('minlength')) {
      return 'Tu nombre de usuario debe tener un mínimo de 3 letras y/o números sin espacios.';
    }

    return this.usernameControl.hasError('pattern') ? 'Nombre de usuario no válido.' : '';
  }

  getPassword1ErrorMessage() {
    if (this.password1Control.hasError('required')) {
      return 'Por favor indica tu contraseña.';
    }
    return this.password1Control.hasError('pattern') ? 'Al menos 8 caracteres, incluyendo 1 carácter especial.' : '';
  }

  passwordMatchValidator(control: FormControl) {
    const password = control.root.get('password1');
    const confirmPassword = control.root.get('password2');

    if (password && confirmPassword) {
      return password.value === confirmPassword.value ? null : { passwordMismatch: true };
    }

    return null;
  }

  getPassword2ErrorMessage() {
    if (this.password2Control.hasError('required')) {
      return 'Por favor confirma la contraseña.';
    }

    return this.password2Control.hasError('passwordMismatch') ? 'Las contraseñas no coinciden.' : '';
  }
}
