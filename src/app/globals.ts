import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { DataService } from './data.service';

@Injectable()
export class Globals {

    // user
    currentUser = '';

    // content
    content: any;
    contentChange: Subject<any> = new Subject<any>();

    message = '';
    messageShow: Subject<string> = new Subject<string>();

    constructor(private dataService: DataService) {
        this.contentChange.subscribe((value) => {
            this.content = value;
        });
        this.messageShow.subscribe((value) => {
            this.message = value;
        });
    }

    setContent(content: any) {
        this.contentChange.next(content);
    }

    showMessage(_message: string) {
        this.messageShow.next(_message);
    }

    query(content): Observable<any> {
        return this.dataService.query(content);
    }

    getForms(): Observable<any> {
        return this.dataService.getData('Forms');
    }

    ping(): Observable<any> {
        return this.dataService.ping();
    }

    save(content: string): any {
        return this.dataService.save(content).subscribe(value => {
            // console.log(this.anythingToJson(value));
        });
    }

    remove(id: string): any {
        return this.dataService.delete(id).subscribe(value => {

        });
    }

    id(id: string): any {
        return this.dataService.id(id);
    }

    getChildrenNodes(id): Observable<any> {
        if (!id) {
            return null;
        }
        return this.dataService.getKids(id);
    }

    uuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:no-bitwise
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    anythingToJson(obj: any) {
        if (obj === null) {
            return 'null';
        }
        if (obj === undefined) {
            return 'undefined';
        }
        if (typeof obj === 'string') {
            return obj;
        }
        return JSON.stringify(obj, null, 2);
    }

}
