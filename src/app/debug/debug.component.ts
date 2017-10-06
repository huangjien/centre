import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import {PanelModule} from 'primeng/primeng';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {

  debugInfo = '';

  constructor(private globals: Globals ) {
    this.globals.debugInfoChange.subscribe(value => {
      this.debugInfo = this.globals.anythingToJson(value);
    });
   }

  ngOnInit() {
  }

}
