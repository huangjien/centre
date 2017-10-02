import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

@Injectable()
export class DataService {

  //data: any;

  constructor(private http: Http) { }

  getData(dataFile: string): Observable<any> {
     
    let response = this.http
      .get('./assets/data/' + dataFile + '.json')
      .map(this.extractData);
    return response;
  }

  private extractData(res : any){
    if(res.status < 200 || res.status >=300){
        throw new Error('Bad response sttus:' + res.status);
    }
    //console.log(JSON.parse (res._body));
    
    let serviceData = (res._body);
    return serviceData || {};
  }

}
