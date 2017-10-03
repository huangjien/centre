import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MenuItem } from 'primeng/primeng';
import { DataService } from './data.service';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
@Injectable()
export class Globals {

    // views' visiblilties
    treeViewVisible = false;
    searchViewVisible = false;
    terminalViewVisible = false;
    debugViewVisible = false;

    // user
    currentUser = '';

    items: MenuItem[];

    // services
    // messageService: MessageService;
    // dataService: DataService;
    constructor(private messageService: MessageService, private dataService: DataService) { }

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
