import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DetailComponent } from '../caballos/detail/detail.component';
import { CaballosService } from '../../services/caballos.service';
import { Caballo } from './caballo.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit {
  caballos$: Observable<Caballo[]>;

  constructor(
              private caballosService:CaballosService, 
              private loadingCtrl: LoadingController,
              private modalCtrl:ModalController) 
              { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({message:'Loading...'});
    loading.present();

    this.caballos$ = this.caballosService.getCaballos().pipe(
      tap((caballos) => {
        loading.dismiss();
        return caballos;
      })
    );
  }

  async openDetailModal(caballo: Caballo){
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {caballo},
    });
    
    await modal.present();

    const {data: updatedCaballo, role} = await modal.onDidDismiss();
    if(updatedCaballo && role == 'edit'){
      this.caballos$ = this.caballos$.pipe(
        map(caballos =>{
          caballos.forEach(cab => {
            if(cab.id === updatedCaballo.id){
              cab = updatedCaballo;
            }
            return cab;
          });
          return caballos;
        })
      );
    }
    if (role == 'delete') {
      this.caballos$ = this.caballos$.pipe(
        map(caballos =>{
          caballos.filter(cab => cab.id !== updatedCaballo.id)
          return caballos;
        })
      );
    }
  }
}
