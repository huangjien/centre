import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { MenuItem } from 'primeng/primeng';
import { DataService } from './data.service';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
@Injectable()
export class Globals {

    // views' visiblilties
    treeViewVisible = false;
    treeViewVisibilityChange: Subject<boolean> = new Subject<boolean>();
    searchViewVisible = false;
    searchViewVisibilityChange: Subject<boolean> = new Subject<boolean>();
    terminalViewVisible = false;
    terminalVisibilityChange: Subject<boolean> = new Subject<boolean>();
    debugViewVisible = false;
    debugVisibilityChange: Subject<boolean> = new Subject<boolean>();

    // user
    currentUser = '';

    items: MenuItem[];

    // services
    // messageService: MessageService;
    // dataService: DataService;
    constructor(private messageService: MessageService, private dataService: DataService) {
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
        this
            .messageService
            .add({ severity: _serverity, summary: _summary, detail: _message });
    }

    getMenuItems(): Observable<any> {
        return this.dataService.getData('menu');
    }

}
