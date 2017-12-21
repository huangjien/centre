import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { BasicComponent } from '../basic/basic.component';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html'
})
export class UiComponent extends BasicComponent {

  constructor(globals: Globals) {
    super(globals);
  }

  removeObject(order: string) {
    this.data.objects = this.removeItem(this.data.objects, order);
  }

  newObject() {
    this.data.objects = this.newItem('Object', this.data.objects);
  }

  importObjects() {
    // this.data.objects = this.newItem('Object', this.data.objects);
  }

}
