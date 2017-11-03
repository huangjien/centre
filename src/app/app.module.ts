import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Rx';
import { TieredMenuModule, MenuItem, EditorModule, TooltipModule, InputSwitchModule, ChipsModule, DropdownModule } from 'primeng/primeng';
import { FileUploadModule, TerminalModule, DragDropModule } from 'primeng/primeng';
import { PanelModule, TreeModule, SelectButtonModule, TreeDragDropService, CheckboxModule, InputTextareaModule } from 'primeng/primeng';
import { ChartModule, DataTableModule, MessagesModule, GrowlModule, DialogModule, ToolbarModule, OrderListModule } from 'primeng/primeng';
import { InputTextModule, AccordionModule, SharedModule, ButtonModule, ContextMenuModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { DataService } from './data.service';
import { Globals } from './globals';
import { MainComponent } from './main/main.component';
import { DebugComponent } from './debug/debug.component';
import { SearchComponent } from './search/search.component';
import { TreeComponent } from './tree/tree.component';
import { TerminalComponent } from './terminal/terminal.component';
import { AngularSplitModule } from 'angular-split';
import { ContentComponent } from './content/content.component';
import { ReferencesComponent } from './references/references.component';


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
    SearchComponent, TreeComponent, TerminalComponent, ContentComponent, ReferencesComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes
      // , {enableTracing: true} // <-- debugging purposes only
    ),
    BrowserModule, BrowserAnimationsModule, ToolbarModule, HttpClientModule, ReactiveFormsModule, DragDropModule,
    ChartModule, DataTableModule, SharedModule, AccordionModule, TerminalModule, CommonModule, DropdownModule,
    ButtonModule, FileUploadModule, MessagesModule, GrowlModule, DialogModule, TooltipModule, ChipsModule,
    TieredMenuModule, PanelModule, AngularSplitModule, EditorModule, SelectButtonModule,
    FormsModule, InputTextModule, TreeModule, SelectButtonModule, CheckboxModule, InputSwitchModule,
    HttpModule, ContextMenuModule
  ],

  providers: [DataService, MessageService, Globals, TreeDragDropService,
    FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
