import { Component, Input, OnInit, ViewChild} from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Carrera } from '../../tab1/carrera.model';
import { CarrerasService } from '../../../services/carreras.service';
import type { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-add-carrera',
  templateUrl: './add-carrera.page.html',
  styleUrls: ['./add-carrera.page.scss'],
})
export class AddCarreraPage implements OnInit {
  @Input() carrera : Carrera;
  isEditMode = false;
  form: FormGroup
  inputModel = '';

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;
  @ViewChild('ionInputLe', { static: true }) ionInputLe!: IonInput;

  constructor(
    private carrerasService: CarrerasService, 
    private loadingCtrl:LoadingController,
    private modalCtrl: ModalController,
    ) { }

  ngOnInit() {
    this.initAddCarreraForm();

    if(this.carrera){
      this.isEditMode = true;
      this.setFormValues();
    }

  }

  initAddCarreraForm(){
    this.form = new FormGroup({
      fecha: new FormControl(null,[Validators.required]),
      hora: new FormControl(null,[Validators.required]),
      distancia: new FormControl(null,[Validators.required]),
      numero_participantes: new FormControl(null,[Validators.required]),
    })
  }

  closeModal(data = null){
    this.modalCtrl.dismiss(data);
  }

  setFormValues(){
    this.form.setValue({
      fecha: this.carrera.fecha,
      hora: this.carrera.hora,
      distancia: this.carrera.distancia,
      numero_participantes: this.carrera.numero_participantes,
    });
    this.form.updateValueAndValidity();
  }
  

 async submitCarrera(){
   const loading = await this.loadingCtrl.create({message:'Loading...'});
   loading.present();

   let response: Observable <Carrera>;

    if(this.isEditMode){
      response = this.carrerasService.updateCarrera(
        this.carrera.id, 
        this.form.value
        );
    }else {
     response = this.carrerasService
      .addCarrera(this.form.value)
    }

    response.pipe(take(1)).subscribe((carrera)=>{
      this.form.reset();
      loading.dismiss();

      if (this.isEditMode){
        this.closeModal(carrera)
      }
    });
  }

  //no caracteres especiales
  onInput(ev) {
    const value = ev.target!.value;
    // Removes non alphanumeric characters
    const filteredValue = value.replace(/[^a-zA-Z0-9]+/g,'');
    this.ionInputEl.value = this.inputModel = filteredValue;
  }

  //no caracteres especiales y no numeros
  onInputL(ev) {
    const value = ev.target!.value;
    const filteredValue = value.replace(/[^a-zA-Z ]+/g,'');
    this.ionInputLe.value = this.inputModel = filteredValue;
  }
}
