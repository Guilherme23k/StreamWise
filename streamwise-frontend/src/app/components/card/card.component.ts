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

  selectedSignature: any = {
  name: '',
  category: '',
  active: true,
  price: 0,
  monthDuration: 0,
  billingDate: '',
  signatureImageCode: ''
};
  isEditMode = false;


  availableSignatures = [
    { name: 'Netflix', url: 'https://img.icons8.com/?size=100&id=20519&format=png&color=000000' },
    { name: 'Prime Video', url: 'https://img.icons8.com/?size=100&id=Rs68BrhxH0XZ&format=png&color=000000' }
  ];


  constructor(private dataCardService: DataCardService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadSignatures();
  }

  daysOfMonth: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  monthsOfYear: number[] = Array.from({ length: 12 }, (_, i) => i + 1);



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
    this.isEditMode = false;
    this.selectedSignature = { name: '', category: '', price: 0, billingDate: '', signatureImageCode: '' };
    this.modalService.open(content);
  }

  openChoiceModal(content: any): void {
    this.modalService.open(content, {
  windowClass: 'modal-centralizado'
});
  }

  openEditModal(content: any, signature: any):void{
    this.isEditMode = true;
    this.selectedSignature = { ...signature };
    this.modalService.open(content);
  }

  addSignature(): void {

    this.selectedSignature.signatureImageCode = this.selectedSignature.signatureImageCode.toUpperCase(); 


    this.dataCardService.addSignature(this.selectedSignature).subscribe({
      next: (response) => {
        console.log('Resposta do Backend:', response);  
        this.signatures.push(response); 
        this.resetselectedSignature();  
        this.modalService.dismissAll();
        this.loadSignatures();
      },
      error: (err) => console.error('Erro ao adicionar assinatura', err)
    });
  }

  editSignature(): void{
    const id = this.selectedSignature.id; 
    const updateSignature = {
      name: this.selectedSignature.name,
    category: this.selectedSignature.category,
    price: this.selectedSignature.price,
    billingDate: this.selectedSignature.billingDate,
    signatureImageCode: this.selectedSignature.signatureImageCode
    };

    this.dataCardService.editSignature(id, updateSignature).subscribe(
      response => {
        console.log('Assinatura editada com sucesso', response);
        this.modalService.dismissAll();
        this.loadSignatures();
      },
      error => {
        console.log('Erro ao editar assinatura', error)
      }
    )
  }

  deleteSignature(signature: any): void{

    const id = signature.id;

    this.dataCardService.deleteSignature(id).subscribe({
      next: () =>{
        this.signatures = this.signatures.filter(sig => sig.id !== id);
        console.log('Assinatura removida com sucesso');
      },

      error: (error) =>{
        console.error('Erro ao remover assinatura', error);
      }
      })
  }

  resetselectedSignature(): void {
    this.selectedSignature = { name: '', category: '', price: 0, billingDate: '', signatureImageCode: '' };
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
      this.selectedSignature.signatureImageCode = selectedSignature.name.toUpperCase();
    }
  }

  get isScrollable(): boolean{
    return this.signatures.length > 2;
  }

}
