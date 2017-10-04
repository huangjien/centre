import {Component, OnInit} from '@angular/core';
import {PanelModule} from 'primeng/primeng';
import {Globals} from '../globals';
import {CheckboxModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']})
export class TerminalComponent implements OnInit {

  command: string;
  response: string;
  readOnly = true;
  constructor(private globals: Globals) {

  }

  isReadOnly(): boolean {
    return this.readOnly;
  }

  onEnter () {
    this.runCommand();
  }
  runCommand() {
    this.response = 'Unknown Command, type "help" to get usage';
    if (this.command === 'date') {
      this.response = new Date().toDateString();
    }
    if (this.command === 'help') {
      this.response = 'Welcome! \n \
      we accept below command:\n \
      date help getMenuData getTreeRootNode getChildrenNodes';
    }
    if (this.command === 'getMenuData') {
      this
        .globals
        .getMenuItems()
        .subscribe(res => {
          // console.log(res);
          this.response = JSON.stringify(res);
        });
    }
    if (this.command === 'getTreeRootNode') {
      this
        .globals
        .getTreeRootNode()
        .subscribe(res => {
          // console.log(res);
          this.response = JSON.stringify(res);
        });
    }
    if (this.command === 'getChildrenNodes') {
      this
        .globals
        .getChildrenNodes()
        .subscribe(res => {
          // console.log(res);
          this.response = JSON.stringify(res);
        });
    }
  }

  ngOnInit() {}

}
