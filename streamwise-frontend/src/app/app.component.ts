import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<router-outlet></router-outlet>`,
  templateUrl: './app.component.html',
  imports: [RouterModule, NavbarComponent],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'streawise-frontend';


}
