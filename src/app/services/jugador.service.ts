import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/jugadores'; 

  getJugadores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearJugador(jugador: any): Observable<any> {
    return this.http.post(this.apiUrl, jugador);
  }
}