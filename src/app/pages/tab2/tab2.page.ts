import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { D_CaballoComponent } from '../caballos/d_caballo/d_caballo.component';
import { JinetesService } from '../../services/jinetes.service';
import { Jinete } from './jinete.model';
import { D_JineteComponent } from '../jinetes/d_jinete/d_jinete.component';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page implements OnInit  {
  jinetes$: Observable<Jinete[]>;

  constructor(
              private jinetesService:JinetesService, 
              private loadingCtrl: LoadingController,
              private modalCtrl:ModalController) 
              { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({message:'Loading...'});
    loading.present();

    this.jinetes$ = this.jinetesService.getJinetes().pipe(
      tap((caballos) => {
        loading.dismiss();
        return caballos;
      })
    );
  }

  async openDetailModal(jinete: Jinete){
    const modal = await this.modalCtrl.create({
      component: D_JineteComponent,
      componentProps: {jinete},
    });
    
    await modal.present();

    const {data: updatedJinete, role} = await modal.onDidDismiss();
    if(updatedJinete && role == 'edit'){
      this.jinetes$ = this.jinetes$.pipe(
        map(jinetes =>{
          jinetes.forEach(cab => {
            if(cab.id === updatedJinete.id){
              cab = updatedJinete;
            }
            return cab;
          });
          return jinetes;
        })
      );
    }
    if (role == 'delete') {
      this.jinetes$ = this.jinetes$.pipe(
        map(jinetes =>{
          jinetes.filter(cab => cab.id !== updatedJinete.id)
          return jinetes;
        })
      );
    }
  }
}
