import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {
  form: FormGroup

  constructor(private registroService: RegistroService, private loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required]),
      password_confirmation: new FormControl(null,[Validators.required]),
      email: new FormControl(null,[Validators.required]),
    })
  }

 async submitProduct(){
   const loanding = await this.loadingCtrl.create({message:'Loading...'});
   loanding.present();

    this.registroService.addUsuario(this.form.value).pipe(
      take(1)
    ).subscribe(()=>{
      this.form.reset();
      loanding.dismiss();
    });
  }

}
