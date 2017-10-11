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
    this.globals.successMessage('Form', JSON.stringify(this.userform.value));
  }

  buildForm() {
    // create controls according content
    // TODO data structure not right, think about it
    const ret: Map<string, FormControl> = new Map<string, FormControl>();
    for (const f of this.globals.getForm(this.content.type).fields) {
      
      const name = f.name;
      ret.set('name', new FormControl(''));
      
    }
    console.log(ret);
    this.userform = this.fb.group(JSON.parse(ret));
  }



  ngOnInit() {
    this.userform = this.fb.group({
    });
    this.globals.contentChange.subscribe(value => {
      this.content = value;
      console.log('we receive change notification');
      console.log(this.content);
      this.hasContent = true;
      this.buildForm();
    });
  }

}
