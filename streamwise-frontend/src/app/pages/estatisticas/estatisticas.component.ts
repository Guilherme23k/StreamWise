  import { Component, OnInit } from '@angular/core';
  import { DataCardService } from '../../services/data-card.service';
  import { CommonModule, DecimalPipe } from '@angular/common';

  @Component({
    selector: 'app-estatisticas',
    standalone: true,
    imports: [DecimalPipe, CommonModule],
    templateUrl: './estatisticas.component.html',
    styleUrl: './estatisticas.component.scss'
  })
  export class EstatisticasComponent implements OnInit{

    signatures: any[] = [];
  precoAssinaturas: number[] = [];

  gastoMensal: number = 0;
  gastoAnual: number = 0;
  gastosMensais: number[] = Array(12).fill(0);


    ngOnInit(): void {
      this.calcularGastos();
    }

    constructor(private dataCardService: DataCardService) { }

    calcularGastos(): void {
    this.dataCardService.getSignatures().subscribe((assinaturas) => {
      this.signatures = assinaturas;
      this.precoAssinaturas = this.signatures.map(a => a.price);

      this.gastoMensal = this.precoAssinaturas.reduce((acc, preco) => acc + preco, 0);
      this.gastoAnual = this.gastoMensal * 12;
    });
  }

}

