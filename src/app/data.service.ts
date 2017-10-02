import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  //data: any;

  constructor(private http: Http) { }

  getData(dataFile: string) {
    return this.http.get('../assets/data/' + dataFile + '.json').map(data => {
      // this.data = data.json();
      console.log(data.json());
      return data.json();
    }, err => {
      if (err) {
        console.log(err);
        return err.json();
      }
    });
  }
}
