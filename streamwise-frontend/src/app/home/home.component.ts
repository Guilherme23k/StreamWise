import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/request.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
  const isAuthenticated = await this.authService.checkAuthAsync();
  if (!isAuthenticated && this.router.url !== '/login') {
    this.router.navigate(['/login']);
  }
}
}