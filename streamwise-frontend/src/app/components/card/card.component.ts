import { Component, OnInit } from '@angular/core';
import { DataCardService } from '../../services/data-card.service';
import { CommonModule } from '@angular/common';

interface Signature {
  id: number;
  name: string;
  category: string;
  price: number;
  billingDate: string;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{

  signatures: Signature[] = [];
  loading = true;
  error = false;

  constructor(private dataCardService: DataCardService){}

  ngOnInit(): void {
      this.dataCardService.getSignatures().subscribe({
        next: (data) => {
        this.signatures = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
      })
  }

  getGridClass(): string{
    const count = this.signatures.length;
    if (count === 1) return "grid-one";
    if (count === 2) return "grid-two";
    if (count === 3) return "grid-three";
    if (count >= 4) return "grid-four";

    return "";
  }

}
