import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Caballo } from '../pages/tab3/caballo.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CaballosService {

    constructor(private http: HttpClient ){}

    getCaballos(): Observable<Caballo[]> {
        return this.http.get<Caballo[]>(`${environment.baseUrl}/caballos`);
    }

    addCaballo(caballo: Caballo): Observable<Caballo>{
        return this.http.post<Caballo>(`${environment.baseUrl}/caballos`,caballo);
    }

    updateCaballo(caballoId: number, product: Caballo): Observable<Caballo>{
        return this.http.put<Caballo>(
            `${environment.baseUrl}/caballos/${caballoId}`,
            product
        );
    }

    deleteCaballo(caballoId: number): Observable<Caballo>{
        return this.http.delete<Caballo>(
            `${environment.baseUrl}/caballos/${caballoId}`
        );
    }
}