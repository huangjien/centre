import { Component, OnInit, Input } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() options: string[];
  searchString: string;
  results: any;
  constructor(private globals: Globals) { }

  ngOnInit() {
  }

  onEnter() {
    this.search();
  }
  search() {
    if (!this.searchString) {
      return;
    }
    if (this.searchString.length > 3) {
      let query_string = '(' + this.searchString + ') ';
      if (this.options.length > 0) {
        query_string += ' AND type:( ';
        this.options.forEach(item => {
          query_string += item + ' ';
        });
        query_string += ' )';
        // this.globals.showMessage(null, null, this.searchString);
        // console.log(query_string);
      }
      // this.globals.infoMessage('Searching...', query_string);
      this.globals.query(query_string).subscribe(res => {
        this.results = res;
        // console.log(this.results);
      });
    } else {
      this.globals.showMessage('You click search button, but forget to input something (at least 3 letters) to search...');
    }
  }

}
