import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent } from "../../components/card/card.component";
import { EstatisticasComponent } from "../estatisticas/estatisticas.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent, EstatisticasComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router){}

  isMenuOpen = false;

  @ViewChild('estatisticas') estatisticasComponent!: EstatisticasComponent;

  atualizarEstatisticas() {
    this.estatisticasComponent.calcularGastos();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
