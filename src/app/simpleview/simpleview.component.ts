import { Component, OnInit, Input } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-simpleview',
  templateUrl: './simpleview.component.html'
})
export class SimpleviewComponent implements OnInit {

  @Input() data;
  name: string;
  type: string;
  id: string;
  icon: string;
  description: string;

  constructor(private globals: Globals) { }

  ngOnInit() {
    this.id = this.data['id'];
    this.name = this.data['name'];
    this.type = this.data['type'];
    this.description = this.data['description'];
    this.icon = this.globals.getIcon(this.type);
  }

  load() {
    this.globals.setContent(this.data);
    this.globals.showMessage(this.id);
    this.globals.collapseSearchView();
    // console.log('id', this.id);
  }

}
