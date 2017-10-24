import {Component, OnInit, Pipe, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Validators, FormControl, FormGroup, FormBuilder, ValidatorFn} from '@angular/forms';
import {Globals} from '../globals';
import {EditorModule, SelectButtonModule} from 'primeng/primeng';

@Component({
  selector: 'app-content', templateUrl: './content.component.html',
  // pipes: [form],
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  form: FormGroup;
  // we will use this later
  hasContent = false;
  readOnly = false;
  @Input()config: any[] = [];
  content = this.globals.content;

  constructor(private fb: FormBuilder, private globals: Globals) {}

  formValid() {
    if (!this.form) {
      return true;
    }
    if (this.readOnly) {
      return true;
    }
    return !this.form.valid;
  }

  onCancel() {
    this
      .form
      .reset();
    this.hasContent = false;
  }

  // re-draw form issue not solved !!!
  onSave() {
    // save data to somewhere
    this
      .globals
      .successMessage('Form', JSON.stringify(this.form.value, null, 2));
    Object
      .keys(this.form.controls)
      .forEach(key => {
        // console.log(this.form.get(key).value);
        this.content[key] = this
          .form
          .get(key)
          .value;
      });
    // this.form.reset();
    this.globals.debug(this.content);
    this.globals.save(JSON.stringify(this.content));
    this
      .globals
      .setContent(this.content);
  }

  onSubmit() {
    this
      .globals
      .successMessage('Form', JSON.stringify(this.form.value, null, 2));
    Object
      .keys(this.form.controls)
      .forEach(key => {
        // console.log(this.form.get(key).value);
        this.content[key] = this
          .form
          .get(key)
          .value;
      });
    this
      .globals
      .setContent(this.content);
      this.globals.debug(this.content);
      this.globals.save(JSON.stringify(this.content));
    this
      .form
      .reset();
    this.hasContent = false;
    // this.buildForm();
  }

  buildForm() {
    if (this.form) {
      this
        .form
        .reset();
    }
    this.config = this
      .globals
      .getForm(this.content.type)
      .fields;
    // create controls according content
    const group = this
      .fb
      .group({});
    this
      .config
      .forEach(control => {
        // build controls with data and validations
        const value = this.content[control.name];
        const validators = this.getValidators(control.validators);
        group.addControl(control.name, this.fb.control(value, validators));
      });
    this.form = group;
    this.hasContent = true;
  }

  getValidators(validators: any): ValidatorFn[] {
    const ret = [];
    validators.forEach(item => {
      switch (item) {
        case 'required':
          {
            ret.push(Validators.required);
            break;
          }
        case 'minlength=3':
          {
            ret.push(Validators.minLength(3));
            break;
          }

        default:
          {
            console.warn('We encounter some unknown validator:' + item);
          }
      }
    });
    return ret;
  }

  ngOnInit() {
    this
      .globals
      .contentChange
      .subscribe(value => {
        console.log(value);
        this.content = value;
        this.buildForm();
      });
  }

}
