import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AngularMaterialModule} from "../angular-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReservationDialogComponent} from "../components/reservation-dialog/reservation-dialog.component";
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import {EditUserDialogComponent} from "../components/edit-user-dialog/edit-user-dialog.component";
import {NewUserDialogComponent} from "../components/new-user-dialog/new-user-dialog.component";
import {NewInstalationDialogComponent} from "../components/new-instalation-dialog/new-instalation-dialog.component";
import {EditInstalationDialogComponent} from "../components/edit-instalation-dialog/edit-instalation-dialog.component";


@NgModule({
  declarations: [
    DashboardComponent,
    ReservationDialogComponent,
    EditUserDialogComponent,
    NewUserDialogComponent,
    NewInstalationDialogComponent,
    EditInstalationDialogComponent,
    AdminComponent,
    UserComponent
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
