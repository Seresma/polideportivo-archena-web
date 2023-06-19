import { Component } from '@angular/core';
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  deportes = ['Todos', 'Fútbol', 'Tenis', 'Natación', 'Frontón', 'Baloncesto'];
  deporteElegido = 'Todos';
  fechaMinima: Date;
  fechaElegida = new Date();
  fechaMaxima: Date;

  constructor(private dateAdapter: DateAdapter<Date>) {

    this.dateAdapter.setLocale('es');
    this.dateAdapter.getFirstDayOfWeek = () => {
      return 1;
    }

    this.fechaMinima = new Date();
    this.fechaMaxima = new Date();
    this.fechaMaxima.setDate(this.fechaMinima.getDate() + 13);
  }

  buscar() {

  }

}
