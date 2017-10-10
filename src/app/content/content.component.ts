import { Component, OnInit, Pipe } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Globals } from '../globals';
import { ValidatorsService } from '../validators.service';
import { FormPipe } from '../form.pipe';
import { DomSanitizer } from '@angular/platform-browser';
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

  buildForm() {
    // this.userform.
    // // create a big set
    // const bigSet = {};
    // bigSet['name'] = 'name';
  }

  getValidators(validators: string[]): any {
    const ret = [];
    for (const v of validators) {
      switch (v) {
        case 'required': {
          ret.push(Validators.required);
          break;
        }
        case 'email': {
          // tslint:disable-next-line:max-line-length
          ret.push(Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/));
          break;
        }
        case 'password': {
          ret.push(Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/));
          break;
        }
        case 'min3': {
          ret.push(Validators.minLength(3));
          break;
        }
        case 'max8': {
          ret.push(Validators.maxLength(8));
          break;
        }
        default: {
          break;
        }
      }
    }
    return ret;
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
    this.globals.contentChange.subscribe(value => {
      this.content = value;
      console.log('we receive change notification');
      console.log(this.content);
      this.hasContent = true;
      this.buildForm();
    });
  }

}
