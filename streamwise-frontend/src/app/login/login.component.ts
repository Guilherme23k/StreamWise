import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/request.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Adicione o FormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    
    this.authService.login();  
    this.router.navigate(['/home']);
  }
}