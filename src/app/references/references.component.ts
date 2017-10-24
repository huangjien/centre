import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReferencesComponent),
      multi: true
    }
  ]
})
export class ReferencesComponent implements ControlValueAccessor {


  @Input() references: any;

  onChange: any = () => {
    console.log(this.references);
  };
  onTouched: any = () => { };

  writeValue(obj: any): void {
    if (obj) {
      this.references = obj;
      console.log(this.references);
    }
  }

  get value() {
    return this.references;
  }

  set value(val) {
    this.references = val;
    this.onChange(val);
    console.log(this.references);
    this.onTouched();
  }

  constructor() { }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }


}
