import { Component, OnInit, Input } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-simpleview',
  templateUrl: './simpleview.component.html',
  styleUrls: ['./simpleview.component.css']
})
export class SimpleviewComponent implements OnInit {

  @Input() data;
  name: string;
  type: string;
  id: string;
  description: string;

  constructor(private globals: Globals) { }

  ngOnInit() {
    this.id = this.data['id'];
    this.name = this.data['name'];
    this.type = this.data['type'];
    this.description = this.data['description'];
  }

  load() {
    this.globals.setContent(this.data);
    this.globals.showMessage(this.id);
    // console.log('id', this.id);
  }

}
