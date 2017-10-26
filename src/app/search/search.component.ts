import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
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
  selectedTypes: string[] = ['Form'];
  selectedRow: any;

  constructor(private globals: Globals) {
    this.types = [];
    this.types.push({ label: 'Suite', value: 'suite' });
    this.types.push({ label: 'Case', value: 'case' });
    this.types.push({ label: 'Object', value: 'OUT' });
    this.types.push({ label: 'Data', value: 'data' });
    this.types.push({ label: 'Form', value: 'Form' });
    this.types.push({ label: 'Result', value: 'result' });
  }

  onRowSelect(event) {
    this.globals.debug(event.data);
    this.globals.setContent(event.data);
  }

  onEnter() {
    this.search();
  }
  search() {
    if (!this.search_string) {
      return;
    }
    if (this.search_string.length > 3) {
      let query_string = '(' + this.search_string + ') ';
      if (this.selectedTypes.length > 0) {
        query_string += ' AND type:( ';
        this.selectedTypes.forEach(item => {
          query_string += item + ' ';
        });
        query_string += ' )';
      }
      // this.globals.infoMessage('Searching...', query_string);
      this.globals.query(query_string).subscribe(res => {
        this.results = res;
      });
    } else {
      this.globals.warnMessage('Search', 'You click search button, but forget to input something (at least 3 letters) to search...');
    }
  }

  ngOnInit() {
  }

}
