import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Globals } from '../globals';
import { ControlValueAccessor } from '@angular/forms/src/directives/control_value_accessor';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
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

}
