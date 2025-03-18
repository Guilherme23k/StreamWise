import { Component, OnInit } from '@angular/core';
import { DataCardService } from '../../services/data-card.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {

  signatures: any[] = [];
  loading = true;
  error = false;


  availableSignatures = [
    { name: 'Netflix', url: 'https://img.icons8.com/?size=100&id=20519&format=png&color=000000' },
    { name: 'Prime Video', url: 'https://img.icons8.com/?size=100&id=Rs68BrhxH0XZ&format=png&color=000000' }
  ];


  newSignature = {
    name: '',
    category: '',
    price: 0,
    billingDate: '',
    signatureImageCode: ''  
  }

  constructor(private dataCardService: DataCardService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadSignatures();
  }

  getImageUrl(signatureName: string): string {
  const selectedSignature = this.availableSignatures.find(s => s.name === signatureName);
  return selectedSignature ? selectedSignature.url : '';
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
    });
  }

 
  openModal(content: any): void {
    this.modalService.open(content);
  }

  addSignature(): void {

    this.newSignature.signatureImageCode = this.newSignature.signatureImageCode.toUpperCase(); 


    this.dataCardService.addSignature(this.newSignature).subscribe({
      next: (response) => {
        console.log('Resposta do Backend:', response);  
        this.signatures.push(response); 
        this.resetNewSignature();  
        this.modalService.dismissAll();  
      },
      error: (err) => console.error('Erro ao adicionar assinatura', err)
    });
  }

  editSignature(signature: any): void{
    const id = signature.id; 
    const updateSignature = {
      name: signature.name,
      category: signature.category,
      price: signature.price,
      billingDate: signature.billingDate,
      signatureImageCode: signature.signatureImageCode
    };

    this.dataCardService.editSignature(id, updateSignature).subscribe(
      response => {
        console.log('Assinatura editada com sucesso', response);
      },
      error => {
        console.log('Erro ao editar assinatura', error)
      }
    )
  }

  resetNewSignature(): void {
    this.newSignature = { name: '', category: '', price: 0, billingDate: '', signatureImageCode: '' };
  }

  
  getBillingDay(dateStr: String): String {
    return dateStr.split("-")[2];  
  }

  
  getGridClass(): string {
    const count = this.signatures.length;
    if (count === 1) return "grid-one";
    if (count === 2) return "grid-two";
    if (count === 3) return "grid-three";
    if (count >= 4) return "grid-four";

    return "";
  }

  
  selectSignatureImageCode(signatureName: string): void {
    
    const selectedSignature = this.availableSignatures.find(s => s.name === signatureName);
    if (selectedSignature) {
      this.newSignature.signatureImageCode = selectedSignature.name.toUpperCase();
    }
  }

}
