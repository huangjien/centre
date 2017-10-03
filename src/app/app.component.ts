import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { RouterModule, Routes } from '@angular/router';
import { AccordionModule, ToolbarModule, DataTableModule } from 'primeng/primeng';
import { TieredMenuModule, MenuItem } from 'primeng/primeng';
import { SharedModule, ButtonModule, GrowlModule, InputTextModule } from 'primeng/primeng';
import { AboutComponent } from './about/about.component';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Globals } from './globals';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    items: MenuItem[];

    constructor(private globals: Globals) { }

    ngOnInit(): void {
        this.globals.getMenuItems().subscribe(res => {
            // console.log(res);
            this.items = res;
            this.globals.successMessage('Data Service', 'Got Menu Data');
        });
    }
}
