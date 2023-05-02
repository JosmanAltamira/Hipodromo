import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  async login(form) {
    console.log('login method called');
  
    if (!this.form.valid) {
      console.log('Form is invalid');
      return;
    }
  
    try {
      const valido = await this.usuarioService.login(form.value.email, form.value.password);
  
      if (valido) {
        this.navCtrl.navigateRoot('/tabs', { animated: true });
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Correo electrónico o contraseña incorrectos.',
          buttons: ['OK']
        });
  
        await alert.present();
      }
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Ha ocurrido un error al iniciar sesión.',
        buttons: ['OK']
      });
  
      await alert.present();
      
    }
  }
  
}