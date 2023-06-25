import {Component, Inject} from '@angular/core';
import {Instalacion} from "../../auth/interfaces/interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InstalationService} from "../../protected/dashboard/services/instalation.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-new-instalation-dialog',
  templateUrl: './new-instalation-dialog.component.html',
  styleUrls: ['./new-instalation-dialog.component.css']
})
export class NewInstalationDialogComponent {

  selectedFile: File | null | undefined;

  deporteSeleccionado: string = '';
  fechaInicioSeleccionada: string = '';
  fechaFinSeleccionada: string = '';
  intervaloSeleccionado: string = '';


  miFormulario: FormGroup = this.fb.group({
    name: [''], // Asigna un valor por defecto si deseas
    cost: [''], // Asigna un valor por defecto si deseas
    sport: [''], // Asigna un valor por defecto si deseas
    initDate: [''], // Asigna un valor por defecto si deseas
    endDate: [''], // Asigna un valor por defecto si deseas
    interval: [''] // Asigna un valor por defecto si deseas
  });

  constructor(private fb: FormBuilder,
              private dialog: MatDialogRef<NewInstalationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private instalationService: InstalationService) {
  }

  onNoClick(): void {
    this.dialog.close();
  }

  crear() {
    if (this.miFormulario.valid) {
      const {name, cost, sport, initDate, endDate, interval} = this.miFormulario.value;
      let instalacion: Instalacion = {
        name: '',
        cost: 0,
        startHour: '',
        endHour: '',
        sport: '',
        intervals: ''
      };

      if (name && name.trim() !== '') {
        instalacion.name = name;
      }

      if (cost && cost.trim() !== '') {
        instalacion.cost = parseFloat(cost);
      }

      if (sport && sport.trim() !== '') {
        instalacion.sport = sport;
      }

      if (initDate && initDate.trim() !== '') {
        instalacion.startHour = initDate;
      }

      if (endDate && endDate.trim() !== '') {
        instalacion.endHour = endDate;
      }

      if (interval && interval.trim() !== '') {
        instalacion.intervals = interval;
      }

      this.instalationService.crearInstalacion(instalacion);
      Swal.fire('Éxito', 'Intalación creada satisfactoriamente.', 'success');
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
}
