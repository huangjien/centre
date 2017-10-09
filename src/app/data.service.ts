import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class DataService {

  // data: any;
  baseUrl = environment.apiUrl;
  constructor(private http: Http) {
  }

  getData(dataFile: string): Observable<any> {
    // console.log(this.baseUrl + dataFile + '.json');
    return this.http
      .get(this.baseUrl + dataFile)
      .map(this.extractData).catch((error: any) => {
        // console.error(error.message ? error.message : error.toString());
        return Observable.throw(error);
      });
  }

  getKids(parentId: string): Observable<any> {
    // console.log(this.baseUrl + 'kids/' + parentId);
    return this.http
      .get(this.baseUrl + 'kids/' + parentId)
      .map(this.extractData).catch((error: any) => {
        // console.error(error.message ? error.message : error.toString());
        return Observable.throw(error);
      });
  }

  private extractData(res: any) {
    if (res.status < 200 || res.status >= 300) {
      res = null;
      throw new Error('Bad response sttus:' + res.status);
    }

    // console.log(res._body);
    return (JSON.parse(res._body));
  }

}
