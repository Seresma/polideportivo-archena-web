import { Injectable } from '@angular/core';
import {Instalacion} from "../../../auth/interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class InstalationService {

  private   instalaciones: Instalacion[] = [
    {
      name: 'Campo municipal de fútbol "Andrés Abenza"',
      sport: "Fútbol",
      startHour: "17:00",
      endHour: "23:00",
      intervals: "1h",
      cost: 15
    },
    {
      name: 'Pista dura',
      sport: "Tenis",
      startHour: "09:00",
      endHour: "15:00",
      intervals: "1h",
      cost: 8
    },
    {
      name: 'Pabellón municipal de deportes',
      sport: "Baloncesto",
      startHour: "17:00",
      endHour: "23:00",
      intervals: "1h",
      cost: 10
    },
    {
      name: 'Pista municipal de frontón',
      sport: "Frontón",
      startHour: "09:00",
      endHour: "15:00",
      intervals: "1h",
      cost: 5
    },
    {
      name: 'Piscina municipal climatizada',
      sport: "Natación",
      startHour: "16:00",
      endHour: "22:00",
      intervals: "1h",
      cost: 6.50
    },
  ];

  constructor() { }

  getInstalaciones() {
    return this.instalaciones;
  }

  eliminarInstalacion(index: number) {
    this.instalaciones = this.instalaciones.slice(0, index).concat(this.instalaciones.slice(index + 1));
  }

  editarInstalacion(instalacion: Instalacion, index: number) {
    this.instalaciones[index] = instalacion;
  }

  crearInstalacion(instalacion: Instalacion) {
    this.instalaciones.unshift(instalacion);

    console.log(instalacion)


    console.log(this.instalaciones)
  }
}
