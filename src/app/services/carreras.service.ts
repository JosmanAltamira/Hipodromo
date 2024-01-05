import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Carrera } from '../models/carrera.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CarrerasService {

    constructor(private http: HttpClient ){}

    getCarreras(): Observable<Carrera[]> {
        return this.http.get<Carrera[]>(`${environment.baseUrl}/carreras`);
    }

    addCarrera(carrera: Carrera): Observable<Carrera>{
        return this.http.post<Carrera>(`${environment.baseUrl}/carreras`,carrera);
    }

    updateCarrera(carreraId: number, carrera: Carrera): Observable<Carrera>{
        return this.http.put<Carrera>(
            `${environment.baseUrl}/carreras/${carreraId}`,
            carrera
        );
    }

    deleteCarrera(carreraId: number): Observable<Carrera>{
        return this.http.delete<Carrera>(
            `${environment.baseUrl}/carreras/${carreraId}`
        );
    }
}