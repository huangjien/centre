import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { BasicComponent } from '../basic/basic.component';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['../../custom.css']
})
export class UiComponent extends BasicComponent {

  constructor(globals: Globals) {
    super(globals);
  }

}
