  import { Component, OnInit } from '@angular/core';
  import { DataCardService } from '../../services/data-card.service';
  import { CommonModule, DecimalPipe, getLocaleDateFormat } from '@angular/common';

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
    duracao:any;
    timeline:number[] = [];
    
    gastoMensal: number = 0;
    gastoAnual: number = 0;
    gastosMensais: number[] = Array(12).fill(0);

    mesesLabels: string[] =[];

    gerarMesesLabels(): void {
      
      const hoje = new Date();

      const mesAtual = hoje.getMonth();

      const mesNomes = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

      this.mesesLabels = Array(12).fill('').map((_, i) => mesNomes[(mesAtual + i) % 12]);

    }
    

    gerarTimeline(): void {
    const meses = 12;
  this.timeline = Array(meses).fill(0); 

  this.signatures.forEach(assinatura => {
    const valor = assinatura.price;
    const duracao = Number(assinatura.monthDuration);

    
    const billingDate = new Date(assinatura.billingDate);
    const mesInicio = billingDate.getMonth();

    for (let i = 0; i < duracao; i++) {
      const indice = (mesInicio + i) % meses; 
      this.timeline[indice] += valor;
    }
  });
    }
  
  
  
  ngOnInit(): void {
    this.calcularGastos();
    this.gerarMesesLabels();
  }

    constructor(private dataCardService: DataCardService) { }

    calcularGastos(): void {
    this.dataCardService.getSignatures().subscribe((assinaturas) => {
      this.signatures = assinaturas;
    
      this.gastoMensal = this.signatures.map(a => a.price).reduce((acc, preco) => acc + preco, 0);
      this.gastoAnual = this.gastoMensal * 12;
      this.gerarTimeline();
    });
  }

}

