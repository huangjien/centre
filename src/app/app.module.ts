import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TieredMenuModule, MenuItem, EditorModule } from 'primeng/primeng';
import { AppComponent } from './app.component';
import { Observable } from 'rxjs/Rx';
import { ChartModule, DataTableModule, MessagesModule, GrowlModule, DialogModule, ToolbarModule, OrderListModule } from 'primeng/primeng';
import { InputTextModule, AccordionModule, SharedModule, ButtonModule, FileUploadModule, TerminalModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DataService } from './data.service';
import { Globals } from './globals';
import { MainComponent } from './main/main.component';
import { DebugComponent } from './debug/debug.component';
import { SearchComponent } from './search/search.component';
import { TreeComponent } from './tree/tree.component';
import { TerminalComponent } from './terminal/terminal.component';
import { PanelModule, TreeModule, SelectButtonModule, TreeDragDropService, CheckboxModule, InputTextareaModule } from 'primeng/primeng';
import { AngularSplitModule } from 'angular-split';
import { AdvGrowlModule, AdvGrowlService } from 'primeng-advanced-growl';
import { ContentComponent } from './content/content.component';


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
    AppComponent, AboutComponent, MainComponent, DebugComponent,
    SearchComponent, TreeComponent, TerminalComponent, ContentComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes
      // , {enableTracing: true} // <-- debugging purposes only
    ),
    BrowserModule, BrowserAnimationsModule, ToolbarModule, HttpClientModule, ReactiveFormsModule,
    ChartModule, DataTableModule, SharedModule, AccordionModule, TerminalModule, CommonModule,
    ButtonModule, FileUploadModule, MessagesModule, GrowlModule, DialogModule,
    TieredMenuModule, PanelModule, AngularSplitModule, AdvGrowlModule, EditorModule, SelectButtonModule,
    FormsModule, InputTextModule, TreeModule, SelectButtonModule, CheckboxModule,
    HttpModule
  ],

  providers: [DataService, MessageService, Globals, TreeDragDropService,
     AdvGrowlService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
