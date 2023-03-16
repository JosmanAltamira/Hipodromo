import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {Registro} from '../pages/login/registro.model';

@Injectable({
    providedIn: 'root',
})
export class RegistroService {
    apiUrl = 'http://192.168.100.138/smart_crud2/public/api';

    constructor(private http: HttpClient ){}


    addUsuario(product: Registro): Observable<Registro>{
        return this.http.post<Registro>(`${this.apiUrl}/register`,product);
    }
}