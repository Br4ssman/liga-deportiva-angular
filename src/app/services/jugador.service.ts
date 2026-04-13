import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/jugadores`; 

  getJugadores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearJugador(jugador: any): Observable<any> {
    return this.http.post(this.apiUrl, jugador);
  }
}