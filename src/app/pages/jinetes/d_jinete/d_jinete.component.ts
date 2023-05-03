import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AddJinetePage  } from '../add-jinete/add-jinete.page';
import { JinetesService } from '../../../services/jinetes.service';
import { Jinete } from '../../tab2/jinete.model';

@Component({
  selector: 'app-detail',
  templateUrl: './d_jinete.component.html',
  styleUrls: ['./d_jinete.component.scss'],
})
export class D_JineteComponent implements OnInit {
  @Input() jinete: Jinete;

  constructor(
    private modalCtrl: ModalController, 
    private loadingCtrl: LoadingController,
    private jineteService: JinetesService
    ) { }

  ngOnInit() {}

  closeModal(role = 'edit'){
    this.modalCtrl.dismiss(this.jinete,role);
  }

  async openEditModal(){
    const modal = await this.modalCtrl.create({
      component: AddJinetePage,
      componentProps: {
        jinete: this.jinete
      },
    });
    await modal.present();

    const {data: updatedJinete} = await modal.onDidDismiss();
    if(updatedJinete){
      this.jinete = updatedJinete;
    }
  }

  async onDeleteJinete(){
    const loading = await this.loadingCtrl.create({message:'Eliminado.....'})
    loading.present();
    this.jineteService.deleteJinete(this.jinete.id).pipe(take(1)).subscribe(()=>{
      loading.dismiss();
      this.closeModal('delete');
    });
  }
}
