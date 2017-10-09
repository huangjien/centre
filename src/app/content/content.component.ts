import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Globals } from '../globals';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  userform: FormGroup;
  hasContent: false;
  content = this.globals.content;

  constructor(private fb: FormBuilder, private globals: Globals) {
    this.globals.contentChange.subscribe(value => {
      this.content = value;
    });
  }

  formValid() {
    if (!this.userform) {
      return true;
    }
    return !this.userform.valid;
  }
  ngOnInit() {
  }

}
