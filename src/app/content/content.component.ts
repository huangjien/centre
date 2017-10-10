import { Component, OnInit, Pipe } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Globals } from '../globals';
import { ValidatorsService } from '../validators.service';
import { FormPipe } from '../form.pipe';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  // pipes: [form],
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  userform: FormGroup;
  hasContent = false;
  readOnly = true;
  content = this.globals.content;

  constructor(private fb: FormBuilder, private globals: Globals, private validatorsService: ValidatorsService) { }

  formValid() {
    if (!this.userform) {
      return true;
    }
    if (this.readOnly) {
      return true;
    }
    return !this.userform.valid;
  }

  onSubmit() {
    console.log(this.userform.value);
    this.globals.successMessage('Form', this.userform.value);
  }
  ngOnInit() {
    this.userform = this.fb.group({
    });
    this.globals.contentChange.subscribe(value => {
      this.content = value;
      console.log('we receive change notification');
      console.log(this.content);
      this.hasContent = true;
    });
  }

}
