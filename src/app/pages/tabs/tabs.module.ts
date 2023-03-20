import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { D_CaballoComponent } from '../caballos/d_caballo/d_caballo.component';
import { D_CarreraComponent } from '../carreras/d_carrera/d_carrera.component';
import { D_JineteComponent } from '../jinetes/d_jinete/d_jinete.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage, D_CaballoComponent, D_CarreraComponent, D_JineteComponent]
})
export class TabsPageModule {}
