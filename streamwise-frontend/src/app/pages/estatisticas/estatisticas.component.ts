  import { Component, OnInit } from '@angular/core';
  import { DataCardService } from '../../services/data-card.service';

  @Component({
    selector: 'app-estatisticas',
    standalone: true,
    imports: [],
    templateUrl: './estatisticas.component.html',
    styleUrl: './estatisticas.component.scss'
  })
  export class EstatisticasComponent implements OnInit{

    signatures: any[] = [];
    precoAssinaturas: number[] = [];

    //pegar os valores das assinaturas e calcular o total delas

    gastosTotais: number = 0;

    //pegar os valores das assinaturas junto com a duracao e fazer o calculo de cada mes quanto vai gastar
    gastosMensais: number[] = Array(12).fill(0);

    ngOnInit(): void {
      this.calcularGastosMensais();
    }

    constructor(private dataCardService: DataCardService) { }

    calcularGastosMensais(): void {
      this.dataCardService.getSignatures().subscribe((assinaturas) =>{
        this.signatures = assinaturas;
        this.precoAssinaturas = this.signatures.map(a => a.price);

        this.gastosTotais = this.precoAssinaturas.reduce((acc, preco) => acc + preco, 0);
        this.gastosMensais = Array(12).fill(this.gastosTotais);
      })
    }




    }
