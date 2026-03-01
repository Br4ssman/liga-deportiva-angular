import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JugadorService } from './jugador.service';

describe('JugadorService (Integración)', () => {
  let service: JugadorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JugadorService]
    });
    service = TestBed.inject(JugadorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe obtener la lista de jugadores mediante GET (Mocking)', () => {
    const mockJugadores = [
      { id: 1, nombre: 'Juan Pérez', posicion: 'Delantero' },
      { id: 2, nombre: 'Ana García', posicion: 'Portera' }
    ];

    service.getJugadores().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(mockJugadores);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/jugadores');
    expect(req.request.method).toBe('GET');
    
    req.flush(mockJugadores); 
  });
});