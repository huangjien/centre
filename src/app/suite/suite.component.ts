import { Component, OnInit } from '@angular/core';
import { BasicComponent } from '../basic/basic.component';
import { Globals } from '../globals';

@Component({
  selector: 'app-suite',
  templateUrl: './suite.component.html',
  styleUrls: ['../../custom.css']
})
export class SuiteComponent extends BasicComponent {

  constructor(globals: Globals) {
    super(globals);
  }
}
