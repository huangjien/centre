import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { Client } from '_debugger';

enum ClientApiUrls {
  ping = 'data/ping',
  delete = 'data/delete/',
  id = 'data/id/',
  query = 'data/query/q=',
  update = 'data/update',
  metaData = 'data/metaData/',
  parentid = 'data/parentid/'
}
@Injectable()
export class DataService {

  // data: any;
  baseUrl = environment.apiUrl;
  headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http) {
  }

  ping(): Observable<any> {
    return this.http.get(environment.apiUrl + ClientApiUrls.ping ).map(this.extractData).catch((error: any) => {
      // console.error(error.message ? error.message : error.toString());
      return Observable.throw(error);
    });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + ClientApiUrls.delete + id).map(this.extractData).catch((error: any) => {
      // console.error(error.message ? error.message : error.toString());
      return Observable.throw(error);
    });
  }

  id(id: string): Observable<any> {
    return this.http.get(this.baseUrl + ClientApiUrls.id + id).map(this.extractData).catch((error: any) => {
      // console.error(error.message ? error.message : error.toString());
      return Observable.throw(error);
    });
  }

  query(content: any): Observable<any> {
    return this.http.get(this.baseUrl + ClientApiUrls.query + content).map(this.extractData).catch((error: any) => {
      // console.error(error.message ? error.message : error.toString());
      return Observable.throw(error);
    });
  }
  save(content: any): Observable<any> {
    return this.http.put(this.baseUrl + ClientApiUrls.update, content, this.options).map(res => {
      // do nothing now, maybe later will add something here
    } ).catch((error: any) => {
      return Observable.throw(error);
    });
  }

  getData(metaDataName: string): Observable<any> {
    // console.log(this.baseUrl + dataFile + '.json');
    return this.http
      .get(this.baseUrl + ClientApiUrls.metaData + metaDataName)
      .map(this.extractData).catch((error: any) => {
        // console.error(error.message ? error.message : error.toString());
        return Observable.throw(error);
      });
  }

  getKids(parentId: string): Observable<any> {
    // console.log(this.baseUrl + 'kids/' + parentId);
    return this.http
      .get(this.baseUrl + ClientApiUrls.parentid + parentId)
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
