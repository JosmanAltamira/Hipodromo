import { Component, ElementRef, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { CarrerasService } from '../../services/carreras.service';
import { Carrera } from '../tab1/carrera.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { JinetesService } from '../../services/jinetes.service';
import { Jinete } from '../tab2/jinete.model';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})


export class Tab4Page implements OnInit  {

  carreras$: Observable<Carrera[]>;
  jinetes$: Observable<Jinete[]>;


  constructor(
    private carrerasService:CarrerasService,
    private loadingCtrl: LoadingController,
    private jinetesService:JinetesService, 
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({message:'Loading...', spinner: 'circles',});
    loading.present();

    this.carreras$ = this.carrerasService.getCarreras().pipe(
      tap((carreras) => {
        loading.dismiss();
        return carreras;
      })
    );
    this.jinetes$ = this.jinetesService.getJinetes().pipe(
      tap((caballos) => {
        return caballos;
      })
    );
  }
}
