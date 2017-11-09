import { Component, OnInit, Pipe, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, FormControl, FormGroup, FormBuilder, ValidatorFn } from '@angular/forms';
import { Globals } from '../globals';
import { EditorModule, SelectButtonModule } from 'primeng/primeng';

@Component({
  selector: 'app-content', templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  form: FormGroup;
  // we will use this later
  hasContent = false;
  readOnly = false;
  @Input() config: any;
  content = this.globals.content;

  constructor(private fb: FormBuilder, private globals: Globals) { }

  formValid() {
    if (!this.form) {
      return false;
    }
    if (this.readOnly) {
      return false;
    }
    return this.form.valid && this.form.dirty;
  }

  onCancel() {
    this
      .form
      .reset();
    this.hasContent = false;
  }

  onDelete() {
    const id = this.content['id'];
    console.log(id);
    if (id) {
      this.globals.remove(id);
      this
        .form
        .reset();
      this.hasContent = false;
    }
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
        this.content[key] = this.form.get(key).value;
      });
    console.log(this.content);
    this.globals.debug(this.content);
    this.globals.save(this.content);
    this.globals.setContent(this.content);
  }

  onSubmit() {
    this.onSave();
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
        const form_control = this.fb.control(value, validators);
        console.log(value );
        console.log(control);
        if ( control.readOnly ) {
          console.log('disabled ' + control);
          form_control.disable();
        }
        form_control.setValue(value,
          {
            onlySelf: false, emitEvent: true,
            emitModelToViewChange: true, emitViewToModelChange: true
          });
        group.addControl(control.name, form_control);
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
        case 'maxlength=32': {
          ret.push(Validators.maxLength(32));
          break;
        }
        case 'email': {
          ret.push(Validators.email);
          break;
        }
        case 'variablename': {
          ret.push(Validators.pattern('[a-zA-Z0-9_.]+'));
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
        // console.log(value);
        this.content = value;
        this.buildForm();
      });
  }

}
