import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TieredMenuModule, MenuItem} from 'primeng/primeng';
import { AppComponent } from './app.component';

import {OrderListModule} from 'primeng/primeng';
import { Observable } from 'rxjs/Rx';
import {ChartModule, DataTableModule, MessagesModule, GrowlModule, DialogModule, ToolbarModule} from 'primeng/primeng';
import {InputTextModule, AccordionModule, SharedModule, ButtonModule, FileUploadModule} from 'primeng/primeng';
import {MessageService} from 'primeng/components/common/messageservice';
import {TerminalModule} from 'primeng/primeng';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DataService } from './data.service';
import { DynamicUiPipe } from './dynamic-ui.pipe';
import { Globals } from './globals';
import { MainComponent } from './main/main.component';
import { DebugComponent } from './debug/debug.component';
import { SearchComponent } from './search/search.component';
import { TreeComponent } from './tree/tree.component';
import { TerminalComponent } from './terminal/terminal.component';
import {PanelModule} from 'primeng/primeng';
import {TreeModule} from 'primeng/primeng';
import { AngularSplitModule } from 'angular-split';
import {SelectButtonModule} from 'primeng/primeng';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  declarations: [
    AppComponent, AboutComponent, DynamicUiPipe, MainComponent, DebugComponent, SearchComponent, TreeComponent, TerminalComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes
        // , {enableTracing: true} // <-- debugging purposes only
    ),
    BrowserModule, BrowserAnimationsModule, ToolbarModule, HttpClientModule,
    ChartModule, DataTableModule, SharedModule, AccordionModule, TerminalModule,
    ButtonModule, FileUploadModule, MessagesModule, GrowlModule, DialogModule,
    TieredMenuModule, PanelModule, AngularSplitModule,
    FormsModule, InputTextModule, TreeModule, SelectButtonModule,
    HttpModule
  ],

  providers: [DataService, MessageService, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
