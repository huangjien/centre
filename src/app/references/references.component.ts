import { Component, Input, OnInit, forwardRef, ElementRef, EventEmitter, Output, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Globals } from '../globals';
import { Helper } from './references.helper';
import { DragDropModule } from 'primeng/components/dragdrop/dragdrop';
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
export class ReferencesComponent implements ControlValueAccessor,
  OnInit,
  OnChanges {

  @Input() references: any;
  @Input() header: string;
  @Input() ref_type: string;
  @Output() private valueChange = new EventEmitter();
  disabled = false;
  selectedRow: any;
  containId = false;
  cols: any[] = [];
  formTypeOptions = [];
  wayOptions = [];

  constructor(private globals: Globals, private helper: Helper) { }

  get value() {
    return this.references;
  }
  ngOnChanges() {
    this.formTypeOptions = this.helper.formTypeOptions;
    this.wayOptions = this.helper.wayOptions;

    if (!this.references) {
      // original is undefined, then will caused error
      this.references = null;
    }
    this.value = this.references;
    // set the column header
    this.cols = this.helper.getCols(this.ref_type);

    if (this.ref_type === 'references') {
      // update the references, add name, type, description
      this.references.forEach(element => {
          const id = element['id'];
          this.globals.id(id).subscribe(item => {
              const wholeElement = item[0];
              element['name'] = wholeElement['name'];
              element['type'] = wholeElement['type'];
              element['description'] = wholeElement['description'];
            });
        });
    }
  }

  ngOnInit() { }

  onChanged = (obj: any) => {
    this
      .valueChange
      .emit(this.references);
  }

  isChosen(): boolean { return this.selectedRow; }

  dropNode(event: DragEvent) {
    const droppedData = JSON.parse(event.dataTransfer.getData('testing'));
    const dragSource = droppedData.type;
    const dropTarget = this.ref_type;
    if (this.helper.isDroppedAllowed(dragSource, dropTarget)) {
      console.log(droppedData, 'allow to drop here');
      if (dragSource === 'Data' && dropTarget === 'inputs') {
        return true;
      }
      if (dragSource === 'Case' && dropTarget === 'references') {
        return true;
      }
      if (dragSource === 'OUT' && dropTarget === 'actions') {
        return true;
      }
    }
  }
  canAddedManually(): boolean {
    return this.ref_type === 'objects' || this.ref_type === 'data' || this.ref_type === 'fields';
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
    const newObject = this.helper.addOneRow(this.ref_type, this.getMaxOrder());
    this.addReference(newObject);
  }

  addReference(newObject) {
    if (newObject['id']) {
      this.globals.id(newObject['id']).subscribe(item => {
          const wholeElement = item[0];
          newObject['name'] = wholeElement['name'];
          newObject['type'] = wholeElement['type'];
          newObject['description'] = wholeElement['description'];
        });
    }
    this.references = [...this.references, newObject];
    // this.references.push(newObject);
    this.writeValue(this.references);
    this.onChanged(this.references);
    this.value = this.references;
  }

  onDelete() {
    // delete the selected
    this.references = this.references.filter(item => item !== this.selectedRow);
    this.writeValue(this.references);
    this.onChanged(this.references);
    this.value = this.references;
  }
  writeValue(obj: any): void {
    if (obj) {
      if (obj !== this.references) {
        console.log('object !== references');
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
    this
      .references
      .forEach(item => {
        if (!item['order']) {
          max = this.references.length + 1;
        }
        if (+ item['order'] === max) {
          max = max + 1;
        }
        if (+ item['order'] > max) {
          max = +item['order'] + 1;
        }
      });
    return max.toString();
  }

  tableChanged() {
    this.onChanged(this.references);
  }

  set value(val) {
    this.references = val;
    this.onChanged(val);
    this.onTouched();
  }

  registerOnChange(fn) {
    this.onChanged = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  onTouched: any = () => { };

  setDisabledState
    ?(isDisabled: boolean)
    : void {
    this.disabled = isDisabled;
  }
}
