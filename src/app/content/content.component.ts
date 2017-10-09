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
  hasContent = false;
  readOnly = true;
  content = this.globals.content;

  constructor(private fb: FormBuilder, private globals: Globals) {
    this.globals.contentChange.subscribe(value => {
      this.content = value;
      console.log('we receive change notification');
      console.log(this.content);
      this.hasContent = true;
      this.buildForm();
    });
  }

  buildForm() {
    this.userform =
    this.fb.group({
      street: ['', Validators.required],
      postcode: ['']
  });
  }

  formValid() {
    if (!this.userform) {
      return true;
    }
    return !this.userform.valid;
  }
  ngOnInit() {
    this.userform = this.fb.group({
    });
  }

}
