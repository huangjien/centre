import { Component, Input, OnInit, forwardRef, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Globals } from '../globals';
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
export class ReferencesComponent implements ControlValueAccessor, OnInit {

  @Input() references: any;
  @Input() header: string;
  @Input() ref_type: string;
  @Output() referencesChange = new EventEmitter();
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

  drop(event) {

    // decide if this will accept this drop

    // add a new item, only need id
    console.log(event);
  }

  removePrimengIssue(obj) {
    obj.forEach(item => {
      delete item['_$visited'];
    });
    return obj;
  }

  onChange = (obj: any) => {
    console.log('onChange() called');
    // remove the _$visited
    this.removePrimengIssue(obj);
    console.log(obj);
    // this.references = this.value;
  }

  onTouched = () => { };

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
    this.referencesChange.emit(this.references);
    this.value = this.references;
  }

  onDelete() {
    // delete the selected
    this.references = this.references.filter(item => item !== this.selectedRow);
    this.writeValue(this.references);
    this.referencesChange.emit(this.references);
    this.value = this.references;
  }
  writeValue(obj: any): void {
    if (obj) {
      obj = this.removePrimengIssue(obj);
      if (obj !== this.references) {
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
        return this.references.length + 1;
      }
      if (item['order'] === max) {
        max = max + 1;
      }
      if (item['order'] > max) {
        max = item['order'] + 1;
      }
    });
    return max.toString();
  }

  tableChanged(event) {

    console.log(event);
    this.onChange(event.data);
    this.value = this.references;
    this.referencesChange.emit(event);
  }

  set value(val) {
    console.log('set value(val)');

    this.onChange(val);
    this.onTouched();
  }

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
