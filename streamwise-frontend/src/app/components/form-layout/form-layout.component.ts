import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-layout',
  standalone: true,
  imports: [],
  templateUrl: './form-layout.component.html',
  styleUrl: './form-layout.component.css'
})
export class FormLayoutComponent {

  @Input() title: string = '';
  @Input() primaryBtnText: string = '';
  @Input() secondaryBtnText: string = '';
  @Output("submit") onSubmit = new EventEmitter();

  @Output("navigate") onNavigate = new EventEmitter();

  submit(){
    this.onSubmit.emit();
  }

  navigate(){
    this.onNavigate.emit();
  }


}
