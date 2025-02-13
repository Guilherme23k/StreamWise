import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  providers: [CurrencyPipe]
})
export class CardComponent {

  @Input() service:any;

  constructor(private currencyPipe: CurrencyPipe) {}

  transformPrice(price: number): string{
    return this.currencyPipe.transform(price, 'BRL', 'symbol', '1.2-2') || '';
  }

}
