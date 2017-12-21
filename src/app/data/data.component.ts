import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { BasicComponent } from '../basic/basic.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html'
})
export class DataComponent extends BasicComponent {

  constructor(globals: Globals) {
    super(globals);
  }

  removeData(order: string) {
    this.data.data = this.removeItem(this.data.data, order);
  }

  newData() {
    this.data.data = this.newItem('Data', this.data.data);
  }
}
