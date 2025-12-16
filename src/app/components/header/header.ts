import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  isLogged(): boolean {
    return this.auth.isLoggedIn(); 
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
