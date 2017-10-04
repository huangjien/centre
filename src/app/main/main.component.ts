import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import {PanelModule} from 'primeng/primeng';
import { AngularSplitModule } from 'angular-split';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  treeViewVisible = true; // this.globals.treeViewVisible;
  searchViewVisible = true;
  terminalViewVisible = true;
  debugViewVisible = true;

  constructor(private globals: Globals) {
    this.globals.treeViewVisibilityChange.subscribe(value => this.treeViewVisible = value);
    this.globals.debugVisibilityChange.subscribe(value => this.debugViewVisible = value);
    this.globals.searchViewVisibilityChange.subscribe(value => this.searchViewVisible = value);
    this.globals.terminalVisibilityChange.subscribe(value => this.terminalViewVisible = value);
   }


  ngOnInit() {

  }

}
