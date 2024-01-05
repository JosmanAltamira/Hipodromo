import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AddCarreraPage  } from '../add-carrera/add-carrera.page';
import { Carrera } from '../../../models/carrera.model';
import { CarrerasService } from '../../../services/carreras.service';



@Component({
  selector: 'app-d_carrera',
  templateUrl: './d_carrera.component.html',
  styleUrls: ['./d_carrera.component.scss'],
})
export class D_CarreraComponent implements OnInit {
  @Input() carrera: Carrera;

  constructor(
    private modalCtrl: ModalController, 
    private loadingCtrl: LoadingController,
    private carreraService: CarrerasService
    ) { }

  ngOnInit() {}

  closeModal(role = 'edit'){
    this.modalCtrl.dismiss(this.carrera,role);
  }

  async openEditModal(){
    const modal = await this.modalCtrl.create({
      component: AddCarreraPage,
      componentProps: {
        carrera: this.carrera
      },
    });
    await modal.present();

    const {data: updatedCarrera} = await modal.onDidDismiss();
    if(updatedCarrera){
      this.carrera = updatedCarrera;
    }
  }

  async onDeleteCarrera(){
    const loading = await this.loadingCtrl.create({message:'Eliminado.....'})
    loading.present();
    this.carreraService.deleteCarrera(this.carrera.id).pipe(take(1)).subscribe(()=>{
      loading.dismiss();
      this.closeModal('delete');
    });
  }
}
