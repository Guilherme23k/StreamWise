import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/request.service';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<router-outlet></router-outlet>`,
  templateUrl: './app.component.html',
  imports: [RouterModule, NavbarComponent],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'streawise-frontend';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.authService.checkAuth()) {
      this.router.navigate(['/login']);
    }
  }
}
