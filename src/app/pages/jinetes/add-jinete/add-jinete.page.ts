import { Component, Input, OnInit, ViewChild} from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Carrera } from '../../tab1/carrera.model';
import type { IonInput } from '@ionic/angular';
import { Jinete } from '../../tab2/jinete.model';
import { JinetesService } from 'src/app/services/jinetes.service';

@Component({
  selector: 'app-add-jinete',
  templateUrl: './add-jinete.page.html',
  styleUrls: ['./add-jinete.page.scss'],
})
export class AddJinetePage implements OnInit {
  @Input() jinete : Jinete;
  isEditMode = false;
  form: FormGroup
  inputModel = '';

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;
  @ViewChild('ionInputLe', { static: true }) ionInputLe!: IonInput;

  constructor(
    private jinetesService: JinetesService, 
    private loadingCtrl:LoadingController,
    private modalCtrl: ModalController,
    ) { }

  ngOnInit() {
    this.initAddJineteForm();

    if(this.jinete){
      this.isEditMode = true;
      this.setFormValues();
    }

  }

  initAddJineteForm(){
    this.form = new FormGroup({
      nombre: new FormControl(null,[Validators.required]),
      edad: new FormControl(null,[Validators.required]),
      nacionalidad: new FormControl(null,[Validators.required]),

    })
  }

  closeModal(data = null){
    this.modalCtrl.dismiss(data);
  }

  setFormValues(){
    this.form.setValue({
      nombre: this.jinete.nombre,
      edad: this.jinete.edad,
      nacionalidad: this.jinete.nacionalidad,
    });
    this.form.updateValueAndValidity();
  }
  

 async submitJinete(){
   const loading = await this.loadingCtrl.create({message:'Loading...'});
   loading.present();

   let response: Observable <Jinete>;

    if(this.isEditMode){
      response = this.jinetesService.updateJinete(
        this.jinete.id, 
        this.form.value
        );
    }else {
     response = this.jinetesService
      .addJinete(this.form.value)
    }

    response.pipe(take(1)).subscribe((jinete)=>{
      this.form.reset();
      loading.dismiss();

      if (this.isEditMode){
        this.closeModal(jinete)
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
