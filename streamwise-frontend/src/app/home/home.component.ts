import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CardComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  services = [
    {
      name: 'Disney+',
      category: 'Streaming',
      price: 50.00,
      image: 'assets/images/disney.jpg'
    },
    {
      name: 'Disney+',
      category: 'Streaming',
      price: 50.00,
      image: 'assets/images/disney.jpg'
    }
  ]
  ngOnInit() {
    console.log(this.services); // Verifique se os serviços estão corretos
  }

}
