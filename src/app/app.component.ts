import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { RouterModule, Routes } from '@angular/router';
import { AccordionModule, ToolbarModule, DataTableModule } from 'primeng/primeng';
import { TieredMenuModule, MenuItem } from 'primeng/primeng';
import { SharedModule, ButtonModule, Message, GrowlModule, InputTextModule } from 'primeng/primeng';
import { AboutComponent } from './about/about.component';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    items: MenuItem[];
    msgs: Message[] = [];

    constructor(private router: Router,
        private dataService: DataService) {
        //TODO: load initial data
    }

    ngOnInit() {
        
            this.dataService.getData('menu').subscribe(
                (res) => {
                    console.log(JSON.parse(res));

                    this.items = JSON.parse(res);
                    
                }
            );
        
        //this.items = this.dataService.getData('menu');
    }
}
