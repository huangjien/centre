import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TieredMenuModule,MenuItem} from 'primeng/primeng';
import { AppComponent } from './app.component';

import {OrderListModule} from 'primeng/primeng';
import { Observable } from 'rxjs/Rx';
import {ChartModule, DataTableModule, MessagesModule, GrowlModule, DialogModule, ToolbarModule} from 'primeng/primeng';
import {InputTextModule, AccordionModule, SharedModule, ButtonModule, FileUploadModule} from 'primeng/primeng';
import {TerminalModule} from 'primeng/primeng';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DataService } from './data.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  declarations: [
    AppComponent, AboutComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes,
        {enableTracing: true} // <-- debugging purposes only
    ),
    BrowserModule, BrowserAnimationsModule, ToolbarModule, HttpClientModule,
    ChartModule, DataTableModule, SharedModule, AccordionModule, TerminalModule,
    ButtonModule, FileUploadModule, MessagesModule, GrowlModule, DialogModule,
    TieredMenuModule, 
    FormsModule, InputTextModule,
    HttpModule
  ],

  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
