import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';

import { LoadingController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { RegistroService } from '../../services/registro.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Usuario {
  _id?: string;
  nombre?: string;
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  
  @ViewChild('slidePrincipal') slides: IonSlides;

  form: FormGroup

  loginUser = {
    email: '',
    password: ''
  }
  registerUser: Usuario = {
    email: '',
    password: '',
    nombre: ''
  };

  
 

  constructor(private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private alertController: AlertController,

    ) { }

  ngOnInit() {
  
  }

  ionViewDidEnter() {
    this.slides.lockSwipes( true );
  }

  async login( flogin: NgForm) {
    if (flogin.invalid){
      return;
    }
    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);
    if( valido ){
      this.navCtrl.navigateRoot('/tabs', {animated: true});
    } else {
      this.presentAlert();
    }
  }
  
  async presentAlert() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: 'Error de identificación',
      message: 'Las credenciales ingresadas no son las correctas.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  mostrarIngreso() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
  
}

