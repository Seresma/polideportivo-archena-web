import {Component} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService: AuthService) {
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }


}
