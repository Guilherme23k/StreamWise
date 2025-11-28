import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataCardService } from '../../services/data-card.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { STREAMINGS, codeToName } from '../../types/streamingList';
import { Streaming } from '../../interface/Streaming';

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
  billingDate: 0,
  signatureImageCode: ''
};
  isEditMode = false;

  buttonSignatureNameSelected : String = '';
  buttonSignatureImageSelected : String = '';


  signaturesList = STREAMINGS;

  @Output() signaturesUpdated = new EventEmitter<void>();


  constructor(private dataCardService: DataCardService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadSignatures();
  }

  daysOfMonth: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  monthsOfYear: number[] = Array.from({ length: 12 }, (_, i) => i + 1);


getImageUrlFromCode(code: string) : string{

  const name = codeToName[code];
  const streaming = STREAMINGS.find(s => s.name === name);
  return streaming?.image ?? 'assets/default.png';


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
    this.selectedSignature = { name: '', category: '', price: 0, billingDate: 0, signatureImageCode: '' };
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

  // 1. Pega o item selecionado da lista de streaming
  const streaming = this.signaturesList.find(s => s.name === this.buttonSignatureNameSelected);

  if (!streaming) return;

  // 2. Cria o objeto completo pra enviar pro backend
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(this.selectedSignature.billingDate).padStart(2, '0');

  const newSignature = {
    id: 0,
    name: streaming.name,
    active: true,
    category: 'STREAMING',
    price: this.selectedSignature.price,
    billingDate: `${year}-${month}-${day}`,
    monthDuration: this.selectedSignature.monthDuration,
    signatureImageCode: streaming.name,
    image: streaming.image
  };

  // 3. Envia pro backend
  this.dataCardService.addSignature(newSignature).subscribe({
    next: (response) => {
      console.log('Resposta do Backend:', response);  
      this.signatures.push(response); 
      this.resetselectedSignature();  
      this.modalService.dismissAll();
      this.loadSignatures();
      this.signaturesUpdated.emit();
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
    this.selectedSignature = { name: '', category: '', price: 0, billingDate: 0, signatureImageCode: '' };
  }

  
  getBillingDay(billingDate: string): string {
  if (!billingDate) return '—';
  return String(parseInt(billingDate.split('-')[2]));
}

  
  getGridClass(): string {
    const count = this.signatures.length;
    if (count === 1) return "grid-one";
    if (count === 2) return "grid-two";
    if (count === 3) return "grid-three";
    if (count >= 4) return "grid-four";

    return "";
  }

  
  // selectSignatureImageCode(signatureName: string): void {
    
  //   const selectedSignature = this.availableSignatures.find(s => s.name === signatureName);
  //   if (selectedSignature) {
  //     this.selectedSignature.signatureImageCode = selectedSignature.name.toUpperCase();
  //   }
  // }

  get isScrollable(): boolean{
    return this.signatures.length > 2;
  }

  showSignatureForms(signature: Streaming): void {

    this.selectedSignature = signature;

    document.querySelector('.modal-forms')!.setAttribute('style', 'display: block;');

    this.buttonSignatureNameSelected = this.selectedSignature.name;
    this.buttonSignatureImageSelected = this.selectedSignature.image;

    this.selectedSignature.category = 'STREAMING'
  }

}
