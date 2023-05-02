import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCarreraPageRoutingModule } from './add-carrera-routing.module';

import { AddCarreraPage } from './add-carrera.page';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddCarreraPageRoutingModule
  ],
  providers: [DatePicker],
  declarations: [AddCarreraPage]
})
export class AddCarreraPageModule {}
