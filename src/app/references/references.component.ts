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
  selectedRow: any;
  cols: any[] = [];
  formTypeOptions = [ {label: 'Select ...', value: null},
    {label: 'id', value: 'id'}, {label: 'text', value: 'text'},
    {label: 'editor', value: 'editor'}, {label: 'multi', value: 'multi'},
    {label: 'single', value: 'single'}, {label: 'references', value: 'references'}];

  onChange: any = () => {
    console.log(this.references);
  }

  onTouched: any = () => { };

  isChosen(): boolean {
    return this.selectedRow;
  }
  writeValue(obj: any): void {
    if (obj) {
      this.references = obj;
      if (this.references && this.references[0]) {
        Object.keys(this.references[0]).forEach(item => {
          let h = item;
          if (item === 'order') {
            h = '#';
          }
          this.cols.push({ field: item, header: h });
        });
      }

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
