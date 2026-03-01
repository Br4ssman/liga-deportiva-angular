import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('debe iniciar sesión y guardar el token en localStorage', () => {
    const mockResponse = { token: '12345', tipo: 'admin', userId: '1' };
    const loginData = { email: 'test@test.com', password: 'password' };

    service.login(loginData).subscribe(res => {
      expect(res.token).toBe('12345');
      expect(localStorage.getItem('token')).toBe('12345');
    });

    const req = httpMock.expectOne('http://localhost:3000/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});