import { Component, OnInit, inject } from '@angular/core';
import { JugadorService } from '../../services/jugador.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jugadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jugadores.html',
  styleUrl: './jugadores.css',
})
export class Jugadores implements OnInit {
  private jugadorService = inject(JugadorService);
  jugadores: any[] = [];

  ngOnInit(): void {
    this.jugadorService.getJugadores().subscribe(data => {
      this.jugadores = data;
    });
  }
}