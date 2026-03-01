import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Importante para ActivatedRoute
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Añadimos RouterTestingModule para solucionar el fallo de ActivatedRoute
      imports: [
        App, 
        HttpClientTestingModule, 
        RouterTestingModule 
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('debe contener el componente header', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // Verificamos que el selector 'app-header' está presente
    expect(compiled.querySelector('app-header')).toBeTruthy();
  });
});
