import { Component, OnInit } from '@angular/core';
import { BasicComponent } from '../basic/basic.component';
import { Globals } from '../globals';

@Component({
  selector: 'app-suite',
  templateUrl: './suite.component.html'
})
export class SuiteComponent extends BasicComponent {

  constructor(globals: Globals) {
    super(globals);
  }

  emoveParameter(order: string) {
    this.data.parameters = this.removeItem(this.data.parameters, order);
  }

  removeReference(order: string) {
    this.data.references = this.removeItem(this.data.references, order);
  }

  removeReturn(order: string) {
    this.data.returns = this.removeItem(this.data.returns, order);
  }

  newParameter() {
    this.data.parameters = this.newItem('Parameter', this.data.parameters);
  }

  newReference() {
    this.data.references = this.newItem('Reference', this.data.references);
  }

  newReturn() {
    this.data.returns = this.newItem('Return', this.data.returns);
  }
}
