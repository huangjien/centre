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

  get value() {
    return this.references;
  }

  ngOnInit() {
    this.value = this.references;
    let containId = false;
    // set the column header
    if (this.references && this.references[0]) {
      Object.keys(this.references[0]).forEach(item => {
        let h = item;
        let definedStyle = {};
        if (item === 'order') {
          h = '#';
          definedStyle = { 'width': '3em', 'text-align': 'center' };
          this.cols.push({ field: item, header: h, style: definedStyle });
        } else
        if (item === 'disabled') {
          h = 'Disabled';
          definedStyle = { 'width': '8em', 'text-align': 'center' };
          this.cols.push({ field: item, header: h, style: definedStyle });
        } else
        if (item === 'readOnly') {
          h = 'Read Only';
          definedStyle = { 'width': '8em', 'text-align': 'center' };
          this.cols.push({ field: item, header: h, style: definedStyle });
        } else
        if (item === 'id') {
          containId = true;
          this.cols.push( {field: 'name', header: 'Name', style: definedStyle });
          this.cols.push( {field: 'type', header: 'Type', style: definedStyle });
        } else {
          definedStyle = { 'display': 'none' };
          this.cols.push({ field: item, header: h, style: definedStyle });
        }
      });
    }
    console.log('ref_type:' + this.ref_type);

if (containId) {
  // update the references, add name, type, description
  this.references.forEach(element => {
    const id = element['id'];
    this.globals.id(id).subscribe(item => {
      const wholeElement = item[0];
      element['name'] = wholeElement['name'];
      element['type'] = wholeElement['type'];
      element['description'] = wholeElement['description'];
    });
    // tslint:disable-next-line:no-bitwise
  });
}

    this.globals.addInputParameter.subscribe(value => {
      console.log('add input parameter:');
      console.log(value);
    });
    this.globals.addReference.subscribe(value => {
      this.add(value);
    });
  }

  onChanged = (obj: any) => {
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
    this.globals.id(newObject['id']).subscribe(item => {
      const wholeElement = item[0];
      newObject['name'] = wholeElement['name'];
      newObject['type'] = wholeElement['type'];
      newObject['description'] = wholeElement['description'];
    });
    this.references = [...this.references, newObject];
    // this.references.push(newObject);
    this.writeValue(this.references);
    this.valueChange.emit(this.references);
    this.value = this.references;
  }

  onDelete() {
    // delete the selected
    this.references = this.references.filter(item => item !== this.selectedRow);
    this.writeValue(this.references);
    this.valueChange.emit(this.references);
    this.value = this.references;
  }
  writeValue(obj: any): void {
    if (obj) {
      if (obj !== this.references) {
        console.log('reference !== obj');
        this.references = obj;
      }
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
    this.references[i]['disabled'] = boolFlag;
  }

  set value(val) {
    this.references = val;
    this.onChanged(val);
    // this.onChanged(val);
    this.onTouched();
  }

  registerOnChange(fn) {
    this.onChanged = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  onTouched: any = () => { };

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }


}
