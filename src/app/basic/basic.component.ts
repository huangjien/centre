import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Globals } from '../globals';
import { ControlValueAccessor } from '@angular/forms/src/directives/control_value_accessor';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html'
})
@Injectable()
export class BasicComponent implements OnInit {
  icon: string;
  data: any;
  dirty = false;
  valid = true;

  constructor(public globals: Globals) { }

  ngOnInit() {
    this.data = this.globals.content;
    this.icon = this.getIcon();
    this.globals.setSaved();
  }

  save() {
    console.log('saving data', this.dirty, this.valid, this.data);
    this.globals.setSaved();
    this.globals.save(this.data);
    this.dirty = false;
  }

  delete() {
    this.globals.remove(this.data['id']);
  }

  getIcon(): string {
    return this.globals.getIcon(this.data['type']);
  }

  removeItem(reference: any, order: string) {
    this.dirty = true;
    this.globals.setUnsaved();
    return reference.filter(item => item['order'] !== order );
  }

  getMaxOrder(reference: any): string {
    if ( !reference ) {
      return '1';
    }
    if ( reference.length === 0 ) {
      return '1';
    }
    let max = reference.length + 1;
    reference.forEach(item => {
      if (item['order']) {
        if (+ item['order'] === max ) {
          max = max + 1;
        }
        if (+ item['order'] > max ) {
          max = +item['order'] + 1;
        }
      }
    });
    return max.toString();
  }

  newItem(type: string, array: any) {
    if (!array) {
      array = [];
    }
    const order = this.getMaxOrder(array);
    let newObj = null;

    if (type === 'Data') {
      newObj = {'order': order, 'key': '', 'value': '', 'diabled': true};
    }
    if (type === 'Object') {
      newObj = {'order': order, 'name': '', 'type': '', 'way': '', 'identity': '', 'description': '', 'diabled': true};
    }
    if (type === 'Parameter') {
      newObj = {'order': order, 'id': '', 'diabled': true};
    }
    if (type === 'ObjectReference') {
      newObj = {'order': order, 'id': '', 'diabled': true};
    }
    if (type === 'Action') {
      newObj = {'order': order, 'id': '', 'diabled': true};
    }
    if (type === 'Reference') {
      newObj = {'order': order, 'id': '', 'diabled': true};
    }
    if (type === 'Return') {
      newObj = {'order': order, 'key': '', 'diabled': true};
    }

    if ( newObj ) {
      this.dirty = true;
      this.valid = false;
      this.globals.setUnsaved();
      return [...array, newObj];
    }
  }

  onChanged() {
    this.dirty = true;
    this.valid = this.checkDataValidation(this.data);
    this.globals.setUnsaved();
  }

  checkDataValidation(data: any): boolean {
    if (data === null || data === undefined || data === '') {
      return false;
    }
    if ( Array.isArray(data)) {
      data.forEach(item => {
        if (!this.checkDataValidation(item)) {
          return false;
        }
      });
    } else {
      for (const property of Object.getOwnPropertyNames(data)) {
        if (property !== 'description' && property !== 'value') {
          if (Array.isArray(data[property])) {
            if (!this.checkDataValidation(data[property])) {
              return false;
            }
          } else {
            if ( data[property] === null || data[property]=== undefined || data[property] === '') {
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  isDirty(): boolean {
    return this.dirty;
  }

  isValid(): boolean {
    return this.valid;
  }

  canSave(): boolean {
    return this.dirty && this.valid;
  }

  cancel() {
    this.globals.setSaved();
    this.globals.setContent('');
  }
}
