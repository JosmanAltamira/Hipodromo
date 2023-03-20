import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddJinetePageRoutingModule } from './add-jinete-routing.module';

import { AddJinetePage } from './add-jinete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddJinetePageRoutingModule
  ],
  declarations: [AddJinetePage]
})
export class AddJinetePageModule {}
