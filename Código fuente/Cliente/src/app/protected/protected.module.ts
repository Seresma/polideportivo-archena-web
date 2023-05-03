import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AngularMaterialModule} from "../angular-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReservationDialogComponent} from "../components/reservation-dialog/reservation-dialog.component";


@NgModule({
  declarations: [
    DashboardComponent,
    ReservationDialogComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProtectedModule { }
