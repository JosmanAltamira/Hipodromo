import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from '../pages/tab3/caballo.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() Product: Product;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
