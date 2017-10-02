import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {RouterModule, Routes} from '@angular/router';
import {AccordionModule, ToolbarModule, DataTableModule} from 'primeng/primeng';
import {TieredMenuModule, MenuItem} from 'primeng/primeng';
import {SharedModule, ButtonModule, GrowlModule, InputTextModule} from 'primeng/primeng';
import {AboutComponent} from './about/about.component';
import {Router} from '@angular/router';
import {DataService} from './data.service';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css']})
export class AppComponent {

    items : MenuItem[];

    constructor(private router : Router, 
        private dataService : DataService,
        private messageService: MessageService) {
        //TODO: load initial data
    }

    successMessage(_summary:string, _message:string ) {
        this.showMessage('success', _summary, _message);
    }

    infoMessage(_summary:string, _message:string ) {
        this.showMessage('info', _summary, _message);
    }

    warnMessage(_summary:string, _message:string ) {
        this.showMessage('warn', _summary, _message);
    }

    errorMessage(_summary:string, _message:string ) {
        this.showMessage('error', _summary, _message);
    }

    showMessage(_serverity:string, _summary:string, _message:string){
        this.messageService.add({severity:_serverity, summary:_summary, detail:_message});
    }

    ngOnInit() {
        if (!this.items){
            this
            .dataService
            .getData('menu')
            .subscribe((res) => {
                //console.log(JSON.parse(res));
                this.items = JSON.parse(res);
                this.successMessage('Data Service', 'Got Dynamic Menu Items');
            });
        }
    }
}
