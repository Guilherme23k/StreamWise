import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './services/guards/auth-guard.guard';
import { AlreadyAuthGuard } from './services/guards/already-auth.guard';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent, canActivate: [AlreadyAuthGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [AlreadyAuthGuard]},
    {path: 'home', component: HomeComponent, canActivate: [authGuard]}
];
