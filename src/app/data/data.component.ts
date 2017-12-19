import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { BasicComponent } from '../basic/basic.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['../../custom.css']
})
export class DataComponent extends BasicComponent {

  constructor(globals: Globals) {
    super(globals);
  }


}
