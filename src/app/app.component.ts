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
import {AdvGrowlService} from 'primeng-advanced-growl';
// import { MessageService } from 'primeng/components/common/messageservice';
import { Globals } from './globals';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    items: MenuItem[];
    messages = [];
    // msgs: Message[] = [];
    constructor(private growlService: AdvGrowlService, private globals: Globals) {
        this.globals.setGrowlService(this.growlService);
    }

    ngOnInit(): void {
        this.globals.getMenuItems().subscribe(res => {
            // console.log(res);
            this.items = res;
            this.globals.successMessage('Data Service', 'Got Menu Data');
            this.globals.debug(res);
        });

    }

    private getMenuText(src): string {
        let ret = src.textContent;
        if (src.tagName === 'SPAN') {
            if (!src.textContent) {
                ret = src.nextElementSibling.innerHTML;
            }
        }
        return ret;
    }

    onClicked($event) {

        const src = event.srcElement;
        let clickedItem = src.innerHTML;
        if (src.tagName === 'A') {
            clickedItem = this.getMenuText(src.children[0]);
        }
        if (src.tagName === 'SPAN') {
            clickedItem = this.getMenuText(src);
        }
        console.log(clickedItem);
        if (!clickedItem) {
            return;
        }
        switch (clickedItem) {
            case 'Explore': {
                this.globals.toggleTreeViewVisibility();
                break;
            }
            case 'Terminal': {
                this.globals.toggleTerminalViewVisibility();
                break;
            }
            case 'Search': {
                this.globals.toggleSearchViewVisibility();
                break;
            }
            case 'Debug': {
                this.globals.toggleDebugViewVisibility();
                break;
            }
            case 'About': {
                // Do nothing, the route link will handle it
                break;
            }

            default: {
                console.log(clickedItem + ' is not been handled.');
                this.globals.warnMessage('May Be A BIG Mistake', clickedItem + ' is not been handled!');
                break;
            }
        }

    }
}
