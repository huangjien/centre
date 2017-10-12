import { Component, OnInit, Pipe, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Globals } from '../globals';
import { ValidatorsService } from '../validators.service';
import { FormPipe } from '../form.pipe';

import {EditorModule, SelectButtonModule} from 'primeng/primeng';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  // pipes: [form],
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  form: FormGroup;
  hasContent = false;
  readOnly = true;
  @Input() config: any[] = [];
  content = this.globals.content;

  constructor(private fb: FormBuilder, private globals: Globals, private validatorsService: ValidatorsService) { }

  formValid() {
    if (!this.form) {
      return false;
    }
    if (this.readOnly) {
      return false;
    }
    return !this.form.valid;
  }

  onSubmit() {
    console.log(this.form.value);
    Object.keys(this.form.controls).forEach(key => console.log(this.form.get(key).value));
    this.globals.successMessage('Form', JSON.stringify(this.form.value));
    this.form.reset();
    // this.clearForm();
  }

  clearForm() {
    this.config = [];
    this.form = this.fb.group({});
  }

  buildForm() {
    // create controls according content
    const group = this.fb.group({});
    this.config.forEach(control => {
      console.log(control);
      group.addControl(control.name, this.fb.control(''));
    });
    return group;
  }



  ngOnInit() {
    this.globals.contentChange.subscribe(value => {
      this.content = value;
      // console.log('we receive change notification');
      // console.log(this.content);
      this.config = this.globals.getForm(this.content.type).fields;
      this.hasContent = true;
      this.form = this.buildForm();
    });
  }

}
