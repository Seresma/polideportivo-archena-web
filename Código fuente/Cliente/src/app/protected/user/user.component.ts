import { Component } from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  nombre: string;
  correo: string;
  contrasena: string;

  constructor(private authService: AuthService) {
    this.nombre = '';
    this.correo = '';
    this.contrasena = '';
  }

  ngOnInit() {
    this.nombre = this.authService.usuario.username;
    this.correo = this.authService.usuario.email;
  }

  guardar() {

  }



}
