import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    this.http
      .post('http://localhost:8080/auth/register', this.registerData)
      .subscribe(
        (response) => {
          console.log('Usuário registrado com sucesso', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Erro no registro', error);
        }
      );
  }
}