import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { BasicComponent } from '../basic/basic.component';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html'
})
export class CaseComponent extends BasicComponent {

  constructor(globals: Globals) {
    super(globals);
  }

  removeParameter(order: string) {
    this.data.parameters = this.removeItem(this.data.parameters, order);
  }

  removeObject(order: string) {
    this.data.objects = this.removeItem(this.data.objects, order);
  }

  removeAction(order: string) {
    this.data.actions = this.removeItem(this.data.actions, order);
  }

  removeReturn(order: string) {
    this.data.returns = this.removeItem(this.data.returns, order);
  }

  newParameter() {
    this.data.parameters = this.newItem('Parameter', this.data.parameters);
  }

  newReference() {
    this.data.objects = this.newItem('ObjectReference', this.data.objects);
  }

  newAction() {
    this.data.actions = this.newItem('Action', this.data.actions);
  }

  newReturn() {
    this.data.returns = this.newItem('Return', this.data.returns);
  }

}
