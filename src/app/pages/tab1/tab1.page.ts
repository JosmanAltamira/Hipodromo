import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { D_CarreraComponent } from '../carreras/d_carrera/d_carrera.component';
import { CarrerasService } from '../../services/carreras.service';
import { Carrera } from './carrera.model';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  carreras$: Observable<Carrera[]>;

  constructor(
              private carrerasService:CarrerasService, 
              private loadingCtrl: LoadingController,
              private modalCtrl:ModalController) 
              { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({message:'Loading...'});
    loading.present();

    this.carreras$ = this.carrerasService.getCarreras().pipe(
      tap((carreras) => {
        loading.dismiss();
        return carreras;
      })
    );
  }

  async openDetailModal(carrera: Carrera){
    const modal = await this.modalCtrl.create({
      component: D_CarreraComponent,
      componentProps: {carrera},
    });
    
    await modal.present();

    const {data: updatedCarrera, role} = await modal.onDidDismiss();
    if(updatedCarrera && role == 'edit'){
      this.carreras$ = this.carreras$.pipe(
        map(carreras =>{
          carreras.forEach(carr => {
            if(carr.id === updatedCarrera.id){
              carr = updatedCarrera;
            }
            return carr;
          });
          return carreras;
        })
      );
    }
    if (role == 'delete') {
      this.carreras$ = this.carreras$.pipe(
        map(carreras =>{
          carreras.filter(carr => carr.id !== updatedCarrera.id)
          return carreras;
        })
      );
    }
  }
  
}
