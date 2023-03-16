import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

// const URL = 'http://192.168.100.138/smart_crud2/public/api';
const URL = 'http://localhost/hipodromo_api/public/api';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 

  private _storage: Storage | null = null;
  token: string = null;
  constructor(private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController) {
      this.init();
     }

     async init(){
       const storage = await this.storage.create();
      this._storage = storage;
     }

  login(email: string, password: string){
    const data={email,password};
    return new Promise( resolve =>{
      this.http.post(`${ URL }/login`, data).subscribe(
       async res =>{
          if(res['token']){
            this.guardarToken(res['token'],res['user'])
            resolve(true);
          } else {
            resolve(false);
            console.log(res, 'sugio un error con las credenciales');
          }
          
        }
      )
    })
  }

  async guardarToken(token: string, user: string){
    this.token = token;
    await this._storage?.set('token',token);
    await this._storage?.set('user',user);
  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }

  async validaToken(){
    await this.cargarToken();
    if(!this.token){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  }
  async logout() {
      await this.storage.clear();
      await this.validaToken();
  }
}