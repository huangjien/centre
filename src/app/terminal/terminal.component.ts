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
      date help ping MENU ROOT ID KIDS FIND';
    }
    if (this.command === 'ping') {
      this
        .globals
        .ping()
        .subscribe(res => {
          // console.log(res);
          this.response = JSON.stringify(res, null, 2);
        });
    }
    if (this.command === 'MENU') {
      this
        .globals
        .getMenuItems()
        .subscribe(res => {
          // console.log(res);
          this.response = JSON.stringify(res, null, 2);
        });
    }
    if (this.command === 'ROOT') {
      this
        .globals
        .getTreeRootNode()
        .subscribe(res => {
          // console.log(res);
          this.response = JSON.stringify(res, null, 2);
        });
    }
    if (this.command.startsWith('ID ')) {
      const commandParameter = this.command.substr(2);
      // TODO: to be implemented
    }

    if (this.command.startsWith('KIDS ')) {
      const commandParameter = this.command.substr(4);
      // TODO: to be implemented
    }

    if (this.command.startsWith('FIND ')) {
      const commandParameter = this.command.substr(4);
      // TODO: to be implemented
    }
  }

  ngOnInit() {}

}
