import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AddCaballoPage  } from '../add-caballo/add-caballo.page';
import { Caballo } from '../../../models/caballo.model';
import { CaballosService } from '../../../services/caballos.service';

@Component({
  selector: 'app-d_caballo',
  templateUrl: './d_caballo.component.html',
  styleUrls: ['./d_caballo.component.scss'],
})
export class D_CaballoComponent implements OnInit {
  @Input() caballo: Caballo;

  constructor(
    private modalCtrl: ModalController, 
    private loadingCtrl: LoadingController,
    private caballoService: CaballosService
    ) { }

  ngOnInit() {}

  closeModal(role = 'edit'){
    this.modalCtrl.dismiss(this.caballo,role);
  }

  async openEditModal(){
    const modal = await this.modalCtrl.create({
      component: AddCaballoPage,
      componentProps: {
        caballo: this.caballo
      },
    });
    await modal.present();

    const {data: updatedCaballo} = await modal.onDidDismiss();
    if(updatedCaballo){
      this.caballo = updatedCaballo;
    }
  }

  async onDeleteCaballo(){
    const loading = await this.loadingCtrl.create({message:'Eliminado.....'})
    loading.present();
    this.caballoService.deleteCaballo(this.caballo.id).pipe(take(1)).subscribe(()=>{
      loading.dismiss();
      this.closeModal('delete');
    });
  }
}
