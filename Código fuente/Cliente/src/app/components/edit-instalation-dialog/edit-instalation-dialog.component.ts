import {Component, Inject} from '@angular/core';
import {Instalacion, Usuario} from "../../auth/interfaces/interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../auth/services/auth.service";
import Swal from "sweetalert2";
import {InstalationService} from "../../protected/dashboard/services/instalation.service";

@Component({
  selector: 'app-edit-instalation-dialog',
  templateUrl: './edit-instalation-dialog.component.html',
  styleUrls: ['./edit-instalation-dialog.component.css']
})
export class EditInstalationDialogComponent {

  instalacion: Instalacion;

  index: number;

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
              private dialog: MatDialogRef<EditInstalationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private instalationService: InstalationService) {

    this.instalacion = data.instalacion;
    this.index = data.index;

    this.deporteSeleccionado = this.instalacion.sport;
    this.fechaInicioSeleccionada = this.instalacion.startHour;
    this.fechaFinSeleccionada = this.instalacion.endHour;
    this.intervaloSeleccionado = this.instalacion.intervals;


  }

  onNoClick(): void {
    this.dialog.close();
  }

  editar() {
    const {name, cost, sport, initDate, endDate, interval} = this.miFormulario.value;
    if (name && name.trim() !== '') {
      this.instalacion.name = name;
    }

    if (cost && cost.trim() !== '') {
      this.instalacion.cost = parseFloat(cost);
    }

    if (sport && sport.trim() !== '') {
      this.instalacion.sport = sport;
    }

    if (initDate && initDate.trim() !== '') {
      this.instalacion.startHour = initDate;
    }

    if (endDate && endDate.trim() !== '') {
      this.instalacion.endHour = endDate;
    }

    if (interval && interval.trim() !== '') {
      this.instalacion.intervals = interval;
    }

    this.instalationService.editarInstalacion(this.instalacion, this.index);
    Swal.fire('Éxito', 'Tus cambios se han guardado correctamente.', 'success');
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

}
