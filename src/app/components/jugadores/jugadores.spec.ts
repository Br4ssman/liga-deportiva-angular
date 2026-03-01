import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Jugadores } from './jugadores';
import { JugadorService } from '../../services/jugador.service';

describe('Jugadores', () => {
  let component: Jugadores;
  let fixture: ComponentFixture<Jugadores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Importamos Jugadores (standalone) y el módulo de pruebas de HTTP
      imports: [Jugadores, HttpClientTestingModule],
      providers: [JugadorService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jugadores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente de jugadores', () => {
    expect(component).toBeTruthy();
  });
});