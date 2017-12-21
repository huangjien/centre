import { Component, OnInit, OnDestroy, CompilerFactory,
  ComponentFactoryResolver, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { Globals } from '../globals';
import { SuiteComponent } from '../suite/suite.component';
import { CaseComponent } from '../case/case.component';
import { DataComponent } from '../data/data.component';
import { UiComponent } from '../ui/ui.component';
import { EnvComponent } from '../env/env.component';
import { ResultComponent } from '../result/result.component';
import { BasicComponent } from '../basic/basic.component';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html'
})
export class DynamicComponent implements OnInit, OnDestroy {
  @ViewChild('hook', { read: ViewContainerRef}) hook: ViewContainerRef;


  constructor(private cfr: ComponentFactoryResolver, private globals: Globals) { }

  ngOnInit() {
    this.globals.contentChange.subscribe( () => {
      // switch - case load components
      let component = null;
      console.log(this.globals.content);
      if ( this.globals.content === '' || this.globals.content === null || this.globals.content === undefined ) {
        this.hook.clear();
        return;
      }
      const type = this.globals.content['type'];
      if ( type === 'Suite') {
        component = this.cfr.resolveComponentFactory<any>(SuiteComponent);
      }
      if ( type === 'Case') {
        component = this.cfr.resolveComponentFactory<any>(CaseComponent);
      }
      if ( type === 'OUT') {
        component = this.cfr.resolveComponentFactory<any>(UiComponent);
      }
      if ( type === 'Data') {
        component = this.cfr.resolveComponentFactory<any>(DataComponent);
      }
      if ( type === 'Environment') {
        component = this.cfr.resolveComponentFactory<any>(EnvComponent);
      }
      if ( type === 'Result') {
        component = this.cfr.resolveComponentFactory<any>(ResultComponent);
      }
      if ( component !== null ) {
        this.hook.clear();
        this.hook.createComponent(component);
      }

    });
  }

  ngOnDestroy() {
    this.hook.clear();
  }

}
