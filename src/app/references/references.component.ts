import { Component, Input, OnInit, forwardRef, ElementRef, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Globals } from '../globals';
@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // tslint:disable-next-line:no-forward-ref
      useExisting: forwardRef(() => ReferencesComponent),
      multi: true
    }
  ]
})
export class ReferencesComponent implements ControlValueAccessor, OnInit {

  @Input() references: any;
  @Input() header: string;
  @Input() ref_type: string;
  @Output() private valueChange = new EventEmitter();
  selectedRow: any;
  cols: any[] = [];
  formTypeOptions = [{ label: 'Select ...', value: null },
  { label: 'id', value: 'id' }, { label: 'text', value: 'text' },
  { label: 'editor', value: 'editor' }, { label: 'multi', value: 'multi' },
  { label: 'single', value: 'single' }, { label: 'references', value: 'references' }];

  constructor(private globals: Globals) {

  }

  ngOnInit() {
    this.value = this.references;
    if (this.references && this.references[0]) {
      Object.keys(this.references[0]).forEach(item => {
        let h = item;
        if (item === 'order') {
          h = '#';
        }
        this.cols.push({ field: item, header: h });
      });
    }
    console.log('ref_type:' + this.ref_type);
    this.globals.addInputParameter.subscribe(value => {
      console.log('add input parameter:');
      console.log(value);
    });
    this.globals.addReference.subscribe(value => {
      console.log('add reference:');
      console.log(value);
      this.add(value);
    });
  }

  onChanged = (obj: any) => {
    console.log('onChange() called');
    // console.log(obj);
    // // this.references = this.value;
  }

  isChosen(): boolean {
    return this.selectedRow;
  }

  add(obj: any) {
    const newObject = Object.assign({}, this.references[0]);

    if (newObject['order']) {
      newObject['order'] = this.getMaxOrder();
    }

    newObject['id'] = obj['id'];

    this.addReference(newObject);
  }

  onAdd() {
    const newObject = Object.assign({}, this.references[0]);

    if (newObject['order']) {
      newObject['order'] = this.getMaxOrder();
    }
    this.addReference(newObject);
  }

  addReference(newObject) {
    this.references = [...this.references, newObject];
    // this.references.push(newObject);
    this.writeValue(this.references);
    this.value = this.references;
  }

  onDelete() {
    // delete the selected
    this.references = this.references.filter(item => item !== this.selectedRow);
    this.writeValue(this.references);
    this.value = this.references;
  }
  writeValue(obj: any): void {
    console.log('writeValue');
    console.log(obj);
    if (obj) {
      if (obj !== this.references) {
        console.log('reference !== obj');
        this.references = obj;
      }
      this.value = obj;
      this.valueChange.emit(this.value);
    }
  }

  getMaxOrder(): string {
    if (!this.references) {
      return '1';
    }
    if (this.references.length === 0) {
      return '1';
    }
    let max = this.references.length + 1;
    this.references.forEach(item => {
      if (!item['order']) {
        max = this.references.length + 1;
      }
      if (+item['order'] === max) {
        max = max + 1;
      }
      if (+item['order'] > max) {
        max = +item['order'] + 1;
      }
    });
    return max.toString();
  }

  onOrderChanged(event, i) {
    this.references[i]['order'] = event.target.value;
  }
  disabledChanged(boolFlag, i) {
    this.references[i]['disabled'] = boolFlag.toString();
  }
  tableChanged(event) {
    console.log('tableChanged');
    this.value = this.references;
  }

  set value(val) {
    console.log('set value(val)');
console.log(val);
    // this.onChanged(val);
    // this.onTouched();
  }

  registerOnChange(fn) {
    this.onChanged = fn;
  }

  registerOnTouched(fn) {
    // this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }


}
