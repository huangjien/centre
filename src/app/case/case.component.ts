import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { BasicComponent } from '../basic/basic.component';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['../../custom.css']
})
export class CaseComponent extends BasicComponent {

  constructor(globals: Globals) {
    super(globals);
  }
}
