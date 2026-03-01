import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Acceso } from './acceso';

describe('Acceso', () => {
  let component: Acceso;
  let fixture: ComponentFixture<Acceso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Acceso, 
        HttpClientTestingModule, 
        RouterTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Acceso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('el formulario de login debe ser inválido si está vacío', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });
});
