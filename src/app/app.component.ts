import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import {MatSnackBar} from '@angular/material';
import { Globals } from './globals';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    messages = [];
    innerHeight: any;
    constructor(private globals: Globals, private snackBar: MatSnackBar) {
        this.innerHeight = window.innerHeight;
    }

    showMessage(msg: string) {
        this.snackBar.open(msg, null, {duration: 1500});
    }

    ngOnInit(): void {
        this.globals.messageShow.subscribe(res => {
            const msg = res;
            this.showMessage(msg);
        });
    }

    clear() {
        this.globals.setContent('');
    }

    getIcon(type: string): string {
        return this.globals.getIcon(type);
    }
}
