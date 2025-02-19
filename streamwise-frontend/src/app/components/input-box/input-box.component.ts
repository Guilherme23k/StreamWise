import { Component, forwardRef, Input, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

type InputTypes = "text" | "email" | "password"

@Component({
  selector: 'app-input-box',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
      useExisting:forwardRef(() => InputBoxComponent),
      multi:true
  }],
  templateUrl: './input-box.component.html',
  styleUrl: './input-box.component.scss'
})
export class InputBoxComponent implements ControlValueAccessor{

  @Input() type: InputTypes = "text";
  @Input() placeholder: string = "";
  @Input() label: string ="";
  @Input() inputName: string = "";

  showPassword: boolean = false;

  value: string = ''
  onChange: any = () => {}
  onTouched: any = () => {}

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value
    this.onChange(value)
  }

  writeValue(value: any): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {}

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }


}

