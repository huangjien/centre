import { Component, OnInit, Input } from '@angular/core';
import { Globals } from '../globals';
import { BasicComponent } from '../basic/basic.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['../../custom.css']
})
export class ResultComponent extends BasicComponent {

  constructor(globals: Globals) {
    super(globals);
  }

}
