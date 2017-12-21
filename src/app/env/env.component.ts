import { Component, OnInit } from '@angular/core';
import { BasicComponent } from '../basic/basic.component';
import { Globals } from '../globals';

@Component({
  selector: 'app-env',
  templateUrl: './env.component.html'
})
export class EnvComponent extends BasicComponent {

  status = 'Idle';
  constructor(globals: Globals) {
    super(globals);
  }

  start() {

  }

  stop() {

  }

}
