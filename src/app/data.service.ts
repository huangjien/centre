import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class DataService {

  // data: any;
  baseUrl = environment.apiUrl + 'data/';
  headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http) {
  }

  ping(): Observable<any> {
    return this.http.get(environment.apiUrl + 'ping').map(this.extractData).catch((error: any) => {
      // console.error(error.message ? error.message : error.toString());
      return Observable.throw(error);
    });
  }

  query(content): Observable<any> {
    return this.http.get(this.baseUrl + 'query/q=' + content).map(this.extractData).catch((error: any) => {
      // console.error(error.message ? error.message : error.toString());
      return Observable.throw(error);
    });
  }
  save(content): Observable<any> {
    return this.http.put(this.baseUrl + 'update', content, this.options).map(res => console.log(res)).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  getData(dataFile: string): Observable<any> {
    // console.log(this.baseUrl + dataFile + '.json');
    return this.http
      .get(this.baseUrl + 'metaData/' + dataFile)
      .map(this.extractData).catch((error: any) => {
        // console.error(error.message ? error.message : error.toString());
        return Observable.throw(error);
      });
  }

  getKids(parentId: string): Observable<any> {
    // console.log(this.baseUrl + 'kids/' + parentId);
    return this.http
      .get(this.baseUrl + 'parentid/' + parentId)
      .map(this.extractData).catch((error: any) => {
        // console.error(error.message ? error.message : error.toString());
        return Observable.throw(error);
      });
  }

  private extractData(res: any) {
    if (res.status < 200 || res.status >= 300) {
      res = null;
      throw new Error('Bad response status:' + res.status);
    }

    // console.log(res._body);
    return (JSON.parse(res._body)['_source']);
  }

}
