import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCaballoPageRoutingModule } from './add-caballo-routing.module';

import { AddCaballoPage } from './add-caballo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddCaballoPageRoutingModule
  ],
  declarations: [AddCaballoPage]
})
export class AddCaballoPageModule {}
