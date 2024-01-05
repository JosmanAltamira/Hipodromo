import { Component, Input, OnInit, ViewChild} from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Caballo } from '../../../models/caballo.model';
import { CaballosService } from '../../../services/caballos.service';
import type { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-add-caballo',
  templateUrl: './add-caballo.page.html',
  styleUrls: ['./add-caballo.page.scss'],
})
export class AddCaballoPage implements OnInit {
  @Input() caballo : Caballo;
  isEditMode = false;
  form: FormGroup
  inputModel = '';

  @ViewChild('ionInputNombre', { static: true }) ionInputNombre!: IonInput;
  @ViewChild('ionInputRaza', { static: true }) ionInputRaza!: IonInput;
  @ViewChild('ionInputNacimiento', { static: true }) ionInputNacimiento!: IonInput;
  @ViewChild('ionInputPeso', { static: true }) ionInputPeso!: IonInput;
  @ViewChild('ionInputPropietario', { static: true }) ionInputPropietario!: IonInput;


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
      nombre: new FormControl(null,[Validators.required]),
      peso: new FormControl(null,[Validators.required]),
      raza: new FormControl(null,[Validators.required]),
      fecha_nacimiento: new FormControl(null,[Validators.required]),
      propietario: new FormControl(null,[Validators.required]),
    })
  }

  closeModal(data = null){
    this.modalCtrl.dismiss(data);
  }

  setFormValues(){
    this.form.setValue({
      nombre: this.caballo.nombre,
      peso: this.caballo.peso,
      raza: this.caballo.raza,
      fecha_nacimiento: this.caballo.fecha_nacimiento,
      propietario: this.caballo.propietario,
    });
    this.form.updateValueAndValidity();
  }
  

 async submitCaballo(){
   console.log(this.form.value);
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
      console.log(caballo);
      this.form.reset();
      loading.dismiss();

      if (this.isEditMode){
        this.closeModal(caballo)
      }
    });
    
  }


  onNombre(ev) {
    const value = ev.target!.value;
    const filteredValue = value.replace(/[^a-zA-Z ]+/g,'');
    this.ionInputNombre.value = this.inputModel = filteredValue;
  }

  onRaza(ev) {
    const value = ev.target!.value;
    const filteredValue = value.replace(/[^a-zA-Z ]+/g,'');
    this.ionInputRaza.value = this.inputModel = filteredValue;
  }

  onNacimiento(ev) {
    const value = ev.target!.value;
    const filteredValue = value.replace(/[^0-9]+/g,'');
    this.ionInputNacimiento.value = this.inputModel = filteredValue;
  }

  onPeso(ev) {
    const value = ev.target!.value;
    const filteredValue = value.replace(/[^0-9]+/g,'');
    this.ionInputPeso.value = this.inputModel = filteredValue;
  }

  onPropietario(ev) {
    const value = ev.target!.value;
    const filteredValue = value.replace(/[^a-zA-Z ]+/g,'');
    this.ionInputPropietario.value = this.inputModel = filteredValue;
  }
}
