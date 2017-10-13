import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { MenuItem } from 'primeng/primeng';
import { DataService } from './data.service';
import { Message } from 'primeng/components/common/api';
import { AdvGrowlService } from 'primeng-advanced-growl';
// import { MessageService } from 'primeng/components/common/messageservice';
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
    // msgs: Message[] = [];
    // messageChange: Subject<Message[]> = new Subject<Message[]>();
    advGrowlService: AdvGrowlService;
    // services
    constructor(private dataService: DataService) {
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

    setContent(content: any) {
        // this.content = content;
        this.contentChange.next(content);
    }

    successMessage(_summary: string, _message: string) {
        this.advGrowlService.createSuccessMessage(_message, _summary);
        // this.showMessage('success', _summary, _message);
    }

    infoMessage(_summary: string, _message: string) {
        this.advGrowlService.createInfoMessage(_message, _summary);
        // this.showMessage('info', _summary, _message);
    }

    warnMessage(_summary: string, _message: string) {
        this.advGrowlService.createWarningMessage(_message, _summary);
        // this.showMessage('warn', _summary, _message);
    }

    errorMessage(_summary: string, _message: string) {
        this.advGrowlService.createErrorMessage(_message, _summary);
        // this.showMessage('error', _summary, _message);
    }

    // showMessage(_serverity: string, _summary: string, _message: string) {
    //     this.advGrowlService.
    //     // this.msgs.push({ severity: _serverity, summary: _summary, detail: _message });

    //     // this.messageChange.next(this.msgs);
    //     // setTimeout(() => {
    //     //     this.msgs = [];
    //     // }, 3000);
    // }

    setGrowlService(growlService: AdvGrowlService) {
        this.advGrowlService = growlService;
    }

    clearMessage() {
        this.advGrowlService.clearMessages();
    }

    getMenuItems(): Observable<any> {
        return this.dataService.getData('menu');
    }

    getForms(): Observable<any> {
        return this.dataService.getData('forms');
    }

    getForm(name: string): any {
        return this.forms.find(item => item.name === name);
    }

    getTreeRootNode(): Observable<any> {
        return this.dataService.getData('treeRootNode');
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
            return JSON.parse('{\'obj\':\'is null\'}');
        }
        if (obj === undefined) {
            return JSON.parse('{\'obj\':\'is undefined\'}');
        }
        if (typeof obj === 'string') {
            return obj;
        }

        return JSON.stringify(obj);
    }

}
