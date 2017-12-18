import { Component, OnInit, OnDestroy, CompilerFactory,
  ComponentFactoryResolver, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { Globals } from '../globals';
import { SuiteComponent } from '../suite/suite.component';
import { CaseComponent } from '../case/case.component';
import { DataComponent } from '../data/data.component';
import { UiComponent } from '../ui/ui.component';
import { EnvComponent } from '../env/env.component';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit, OnDestroy {
  @ViewChild('hook', { read: ViewContainerRef}) hook: ViewContainerRef;


  constructor(private cfr: ComponentFactoryResolver, private globals: Globals) { }

  ngOnInit() {
    this.globals.contentChange.subscribe( () => {
      // switch - case load components
      console.log(this.globals.content);
    });
  }

  ngOnDestroy() {
    this.hook.clear();
  }

}
