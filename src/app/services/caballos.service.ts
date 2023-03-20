import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Caballo } from '../pages/tab3/caballo.model';

@Injectable({
    providedIn: 'root',
})
export class CaballosService {
    apiUrl = 'http://192.168.100.138/hipodromo_api/public/api';
    // apiUrl = 'http://localhost/hipodromo_api/public/api';

    constructor(private http: HttpClient ){}

    getCaballos(): Observable<Caballo[]> {
        return this.http.get<Caballo[]>(`${this.apiUrl}/caballos`);
    }

    addCaballo(caballo: Caballo): Observable<Caballo>{
        return this.http.post<Caballo>(`${this.apiUrl}/caballos`,caballo);
    }

    updateCaballo(caballoId: number, product: Caballo): Observable<Caballo>{
        return this.http.put<Caballo>(
            `${this.apiUrl}/caballos/${caballoId}`,
            product
        );
    }

    deleteCaballo(caballoId: number): Observable<Caballo>{
        return this.http.delete<Caballo>(
            `${this.apiUrl}/products/${caballoId}`
        );
    }
}