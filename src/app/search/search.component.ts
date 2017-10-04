import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';

import {ButtonModule} from 'primeng/primeng';
import { Globals } from '../globals';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  types: SelectItem[];
  results: any;
  search_string: string;
  selectedTypes: string[] = ['suite', 'case'];

  constructor(private globals: Globals) {
    this.types = [];
    this.types.push({ label: 'Suite', value: 'suite' });
    this.types.push({ label: 'Case', value: 'case' });
    this.types.push({ label: 'Object', value: 'object' });
    this.types.push({ label: 'Data', value: 'data' });
    this.types.push({ label: 'Result', value: 'result' });
  }

  search() {
    if (this.search_string) {
      this.globals.infoMessage('Searching...', this.search_string);
      this.results = JSON.stringify(this.globals.debugInfo);
      this.globals.clearMessage();
    } else {
      this.globals.warnMessage('Search', 'You click search button, but forget to input something to search...');
    }
  }

  ngOnInit() {
  }

}
