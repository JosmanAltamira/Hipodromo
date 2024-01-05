import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form: FormGroup;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async onLogin() {
    const loading = await this.loadingCtrl.create({
      message: 'Espere por favor...',
    });

    loading.present();

    this.authService.login(this.form.value).subscribe({
      next: (response: any) => {
        loading.dismiss();
        this.form.reset();

        localStorage.setItem('expenseAppToken', response.token);
        localStorage.setItem('name', response.name);
        this.router.navigateByUrl('/tabs');
      },
      error: (error) => {
        loading.dismiss();
        console.log(error);
      },
    });
  }

  
}