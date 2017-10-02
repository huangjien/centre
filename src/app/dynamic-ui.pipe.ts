import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dynamicUi'
})
export class DynamicUiPipe implements PipeTransform {

  //accept 2 json data: form is the structure of the form, data are the data on the UI objects
  transform(form: any, data?: any): any {
    return null;
  }

}
