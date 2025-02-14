import { Component } from '@angular/core';
import { FormLayoutComponent } from '../../components/form-layout/form-layout.component';
import { InputBoxComponent } from "../../components/input-box/input-box.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserResponseService } from '../../services/user-response.service';
import { Router } from '@angular/router';

interface LoginForm {
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormLayoutComponent, InputBoxComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  providers: [
    UserResponseService
  ],
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup<LoginForm>;

  constructor(private userResponseService: UserResponseService, private router: Router) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit(){
    this.userResponseService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) =>{
        console.log("Errro", error);
      }
    })
  }

  navigate(){
    this.router.navigate(['/register'])
  }
  

}
