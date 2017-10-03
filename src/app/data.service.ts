import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  // data: any;

  constructor(private http: Http) {
  }

  getData(dataFile: string): Observable<any> {

    return this
      .http
      .get('./assets/data/' + dataFile + '.json')
      .map(this.extractData);
  }

  private extractData(res: any) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response sttus:' + res.status);
    }
    // console.log(res._body);
    return (JSON.parse(res._body));
  }

}
