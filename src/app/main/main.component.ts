import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  treeViewVisible = false; // this.globals.treeViewVisible;
  searchViewVisible = false;
  terminalViewVisible = false;
  debugViewVisible = false;

  constructor(private globals: Globals) {
    this.globals.treeViewVisibilityChange.subscribe(value => this.treeViewVisible = value);
    this.globals.debugVisibilityChange.subscribe(value => this.debugViewVisible = value);
    this.globals.searchViewVisibilityChange.subscribe(value => this.searchViewVisible = value);
    this.globals.terminalVisibilityChange.subscribe(value => this.terminalViewVisible = value);
   }

  ngOnInit() {

  }

}
