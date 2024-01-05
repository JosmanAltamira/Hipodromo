import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Jinete } from '../models/jinete.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class JinetesService {

    constructor(private http: HttpClient ){}

    getJinetes(): Observable<Jinete[]> {
        return this.http.get<Jinete[]>(`${environment.baseUrl}/jinetes`);
    }

    addJinete(jinete: Jinete): Observable<Jinete>{
        return this.http.post<Jinete>(`${environment.baseUrl}/jinetes`,jinete);
    }

    updateJinete(jineteId: number, jinete: Jinete): Observable<Jinete>{
        return this.http.put<Jinete>(
            `${environment.baseUrl}/jinetes/${jineteId}`,
            jinete
        );
    }

    deleteJinete(jineteId: number): Observable<Jinete>{
        return this.http.delete<Jinete>(
            `${environment.baseUrl}/jinetes/${jineteId}`
        );
    }
}