import { Component } from '@angular/core';
import { FormLayoutComponent } from "../../components/form-layout/form-layout.component";
import { InputBoxComponent } from "../../components/input-box/input-box.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserResponseService } from '../../services/user-response.service';

interface registerForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormLayoutComponent, InputBoxComponent, ReactiveFormsModule],
  providers:[UserResponseService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm!: FormGroup<registerForm>;

  constructor(private userResponse: UserResponseService, private router: Router){

    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

  }

  submit(){
    this.userResponse.register(this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password).subscribe({
      next: () => console.log('sucesso'),
      error: () => console.log('error')
    })
  }

  navigate(){
    this.router.navigate(["login"])
  }

}
