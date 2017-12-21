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
  constructor(public globals: Globals) { }

  ngOnInit() {
    this.data = this.globals.content;
    this.icon = this.getIcon();
  }

  save() {
    console.log('saving data', this.data);
    this.globals.save(this.data);
  }

  delete() {
    this.globals.remove(this.data['id']);
  }

  getIcon(): string {
    return this.globals.getIcon(this.data['type']);
  }

  removeItem(reference: any, order: string) {
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
      return [...array, newObj];
    }
  }

}
