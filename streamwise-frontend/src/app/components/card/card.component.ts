import { Component, OnInit } from '@angular/core';
import { DataCardService } from '../../services/data-card.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Signature {
  id: number;
  name: string;
  category: string;
  price: number;
  billingDate: string;
  imageUrl: string; 
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{

  signatures: Signature[] = [];
  loading = true;
  error = false;
  newSignature = {
    name: '',
    category: '',
    price: 0,
    billingDate: '',
    signatureImage: ''
  }

  constructor(private dataCardService: DataCardService, private modalService: NgbModal){}


  ngOnInit(): void {
      this.loadSignatures();
  }

  loadSignatures(): void {
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

  openModal(content: any): void {
    this.modalService.open(content);
  }

  addSignature(): void {
    this.dataCardService.addSignature(this.newSignature).subscribe({
      next: (response) => {
        this.signatures.push(response);
        this.newSignature = { name: '', category: '', price: 0, billingDate: '', signatureImage: '' };
        this.modalService.dismissAll(); 
      },
      error: (err) => console.error('Erro ao adicionar assinatura', err)
    });
  }


  getBillingDay(dateStr: String): String{
    return dateStr.split("-")[2];
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
