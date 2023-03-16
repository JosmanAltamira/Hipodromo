import { Component, Input, OnInit, ViewChild} from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Caballo } from '../../tab3/caballo.model';
import { CaballosService } from '../../../services/caballos.service';
import type { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-add-carrera',
  templateUrl: './add-carrera.page.html',
  styleUrls: ['./add-carrera.page.scss'],
})
export class AddCarreraPage implements OnInit {
  @Input() caballo : Caballo;
  isEditMode = false;
  form: FormGroup
  inputModel = '';

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;
  @ViewChild('ionInputLe', { static: true }) ionInputLe!: IonInput;

  constructor(
    private caballosService: CaballosService, 
    private loadingCtrl:LoadingController,
    private modalCtrl: ModalController,
    ) { }

  ngOnInit() {
    this.initAddCaballoForm();

    if(this.caballo){
      this.isEditMode = true;
      this.setFormValues();
    }

  }

  initAddCaballoForm(){
    this.form = new FormGroup({
      Nombre: new FormControl(null,[Validators.required]),
      Peso: new FormControl(null,[Validators.required]),
      Raza: new FormControl(null,[Validators.required]),
      Fecha_Nacimiento: new FormControl(null,[Validators.required]),
      Propietario: new FormControl(null,[Validators.required]),
    })
  }

  closeModal(data = null){
    this.modalCtrl.dismiss(data);
  }

  setFormValues(){
    this.form.setValue({
      Nombre: this.caballo.Nombre,
      Peso: this.caballo.Peso,
      Raza: this.caballo.Raza,
      Fecha_Nacimiento: this.caballo.Fecha_Nacimiento,
      Propietario: this.caballo.Propietario,
    });
    this.form.updateValueAndValidity();
  }
  

 async submitCaballo(){
   const loading = await this.loadingCtrl.create({message:'Loading...'});
   loading.present();

   let response: Observable <Caballo>;

    if(this.isEditMode){
      response = this.caballosService.updateCaballo(
        this.caballo.id, 
        this.form.value
        );
    }else {
     response = this.caballosService
      .addCaballo(this.form.value)
    }

    response.pipe(take(1)).subscribe((caballo)=>{
      this.form.reset();
      loading.dismiss();

      if (this.isEditMode){
        this.closeModal(caballo)
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
