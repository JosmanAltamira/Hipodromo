import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Jinete } from '../pages/tab2/jinete.model';

@Injectable({
    providedIn: 'root',
})
export class JinetesService {
    apiUrl = 'http://192.168.100.138/hipodromo_api/public/api';
    // apiUrl = 'http://localhost/hipodromo_api/public/api';

    constructor(private http: HttpClient ){}

    getJinetes(): Observable<Jinete[]> {
        return this.http.get<Jinete[]>(`${this.apiUrl}/jinetes`);
    }

    addJinete(jinete: Jinete): Observable<Jinete>{
        return this.http.post<Jinete>(`${this.apiUrl}/jinetes`,jinete);
    }

    updateJinete(jineteId: number, jinete: Jinete): Observable<Jinete>{
        return this.http.put<Jinete>(
            `${this.apiUrl}/jinetes/${jineteId}`,
            jinete
        );
    }

    deleteJinete(jineteId: number): Observable<Jinete>{
        return this.http.delete<Jinete>(
            `${this.apiUrl}/jinetes/${jineteId}`
        );
    }
}