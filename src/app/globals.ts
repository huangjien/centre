import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { MenuItem } from 'primeng/primeng';
import { DataService } from './data.service';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
@Injectable()
export class Globals {

    // views' visiblilties
    treeViewVisible = true;
    treeViewVisibilityChange: Subject<boolean> = new Subject<boolean>();
    searchViewVisible = true;
    searchViewVisibilityChange: Subject<boolean> = new Subject<boolean>();
    terminalViewVisible = false;
    terminalVisibilityChange: Subject<boolean> = new Subject<boolean>();
    debugViewVisible = true;
    debugVisibilityChange: Subject<boolean> = new Subject<boolean>();

    addReferenceItem: any;
    addInputParameterItem: any;

    addReference: Subject<any> = new Subject<any>();
    addInputParameter: Subject<any> = new Subject<any>();

    // debug info
    debugInfo = '';
    debugInfoChange: Subject<string> = new Subject<string>();

    // user
    currentUser = '';

    // rootID
    rootID = '';

    // content
    content: any;
    contentChange: Subject<any> = new Subject<any>();

    // forms metadata store here
    forms: any[];

    messages = [];
    // messages
    msgs: Message[] = [];
    messageChange: Subject<Message[]> = new Subject<Message[]>();
    // services
    constructor(private dataService: DataService, private messageService: MessageService) {
        // subscribe view visibility changes
        this.treeViewVisibilityChange.subscribe((value) => {
            this.treeViewVisible = value;
        });
        this.searchViewVisibilityChange.subscribe((value) => {
            this.searchViewVisible = value;
        });
        this.terminalVisibilityChange.subscribe((value) => {
            this.terminalViewVisible = value;
        });
        this.debugVisibilityChange.subscribe((value) => {
            this.debugViewVisible = value;
        });

        // subscribe debug info changes
        this.debugInfoChange.subscribe((value) => {
            this.debugInfo = value;
        });

        this.contentChange.subscribe((value) => {
            this.content = value;
        });

        this.addInputParameter.subscribe(value => {
            this.addInputParameter = value;
        });

        this.addReference.subscribe(value => {
            this.addReferenceItem = value;
        });

    }

    toggleTreeViewVisibility() {
        this.treeViewVisibilityChange.next(!this.treeViewVisible);
    }

    toggleDebugViewVisibility() {
        this.debugVisibilityChange.next(!this.debugViewVisible);
    }

    toggleTerminalViewVisibility() {
        this.terminalVisibilityChange.next(!this.terminalViewVisible);
    }

    toggleSearchViewVisibility() {
        this.searchViewVisibilityChange.next(!this.searchViewVisible);
    }

    debug(info: string) {
        this.debugInfoChange.next(info);
    }

    add_Reference(content: any) {
        this.addReferenceItem = content;
        this.addReference.next(this.addReferenceItem);
    }

    add_InputParameter(content: any) {
        this.addInputParameterItem = content;
        this.addInputParameter.next(this.addInputParameterItem);
    }

    setContent(content: any) {
        // this.content = content;
        this.contentChange.next(content);
    }

    successMessage(_summary: string, _message: string) {
        this.showMessage('success', _summary, _message);
    }

    infoMessage(_summary: string, _message: string) {
        this.showMessage('info', _summary, _message);
    }

    warnMessage(_summary: string, _message: string) {
        this.showMessage('warn', _summary, _message);
    }

    errorMessage(_summary: string, _message: string) {
        this.showMessage('error', _summary, _message);
    }

    showMessage(_serverity: string, _summary: string, _message: string) {
        this.messageService.add({severity: _serverity, summary: _summary, detail: _message});
    }

    clearMessage() {
        this.messageService.clear();
    }

    getMenuItems(): Observable<any> {
        return this.dataService.getData('Menu');
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

    getForm(name: string): any {
        return this.forms.find(item => item.name === name);
    }

    getTreeRootNode(): Observable<any> {
        return this.dataService.getData('Root');
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
