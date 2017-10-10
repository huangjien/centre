import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Globals } from './globals';

@Pipe({
  name: 'form'
})
export class FormPipe implements PipeTransform {

  constructor(private globals: Globals, private sanitizer: DomSanitizer) { }
  transform(value: any, formData?: any): any {
    // value is the form name
    let ret = '';
    let id = '';
    const formStructure = this.globals.getForm(value);
    console.log(formStructure);
    if (formData === undefined || formData === null) {
      id = this.globals.uuid();
    } else {
      id = formData['_id'];
    }
    ret += '<input style="visibility:hidden;" type="text" pInputText id="_id" disabled="true" value="' + id + '"/>';
    for (const f of formStructure.fields) {
      ret += this.getOneField(f, formData);
    }
    console.log(ret);
    return this.sanitizer.bypassSecurityTrustHtml(ret);
  }

  private getOneField(field: any, formData?: any): string {
    const type = field['type'];
    const name = field['name'];
    const readOnly = field['readOnly'];
    let ret = '<';
    if (type === 'text') {
      ret += 'input type="text" pInputText ';
    }
    if (readOnly === 'true') {
      ret += ' [disabled]="true" ';
    } else {
      ret += ' [disabled]="readOnly" ';
    }

    ret += ' name="' + name + '" ';
    ret += '/>';

    return ret;
  }

  private getFieldValue(name: string, formData?: any): string {
    if (formData === undefined || formData === null) {
      return null;
    }
    return formData[name];
  }

}
