import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;

  constructor(
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async onRegister() {
    const loading = await this.loadingCtrl.create({
      message: 'Espere por favor...',
    });

    loading.present();

    this.authService.register(this.form.value).subscribe({
      next: () => {
        loading.dismiss();
        this.form.reset();
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        loading.dismiss();
        console.log(error);
      },
    });
  }
}
