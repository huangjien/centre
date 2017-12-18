import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Rx';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatPaginatorModule,
  MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatGridListModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSortModule,
  MatSlideToggleModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule,
  MatTooltipModule, MatFormFieldModule, MatExpansionModule, MatStepperModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Globals } from './globals';
import { SearchComponent } from './search/search.component';
import { SimpleviewComponent } from './simpleview/simpleview.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { SuiteComponent } from './suite/suite.component';
import { CaseComponent } from './case/case.component';
import { UiComponent } from './ui/ui.component';
import { DataComponent } from './data/data.component';
import { ResultComponent } from './result/result.component';
import { EnvComponent } from './env/env.component';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SimpleviewComponent,
    DynamicComponent,
    SuiteComponent,
    CaseComponent,
    UiComponent,
    DataComponent,
    ResultComponent,
    EnvComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes
      // , {enableTracing: true} // <-- debugging purposes only
    ),  environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    BrowserModule, BrowserAnimationsModule, HttpClientModule, ReactiveFormsModule, CommonModule, MatButtonModule, MatCheckboxModule,
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatPaginatorModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
    MatDialogModule, MatGridListModule, MatIconModule, MatInputModule,
    MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSortModule,
    MatSlideToggleModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule,
    MatTooltipModule, MatFormFieldModule, MatExpansionModule, MatStepperModule, FormsModule, HttpModule
  ],

  providers: [DataService, FormBuilder, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
