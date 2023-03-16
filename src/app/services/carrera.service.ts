import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Carrera } from '../pages/tab1/carreras.model';

@Injectable({
    providedIn: 'root',
})
export class CarreraService {
    // apiUrl = 'http://192.168.100.138/hipodromo/public/api';
    apiUrl = 'http://localhost/hipodromo_api/public/api';

    constructor(private http: HttpClient ){}

    getCarreras(): Observable<Carrera[]> {
        return this.http.get<Carrera[]>(`${this.apiUrl}/carrera`);
    }

    addCaballo(carrera: Carrera): Observable<Carrera>{
        return this.http.post<Carrera>(`${this.apiUrl}/caballos`,carrera);
    }

    updateCaballo(carreraId: number, carrera: Carrera): Observable<Carrera>{
        return this.http.put<Carrera>(
            `${this.apiUrl}/carreras/${carreraId}`,
            carrera
        );
    }

    deleteCaballo(carreraId: number): Observable<Carrera>{
        return this.http.delete<Carrera>(
            `${this.apiUrl}/carreras/${carreraId}`
        );
    }
}