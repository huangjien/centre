import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import {MatSnackBar} from '@angular/material';
import { Globals } from './globals';
import { OktaCallbackComponent, OktaAuthModule } from '@okta/okta-angular';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    messages = [];
    innerHeight: any;

    constructor(private globals: Globals, private snackBar: MatSnackBar,
        private oktaAuth: OktaAuthService) {
        this.innerHeight = window.innerHeight;
        // this.authenticated = this.oktaAuth.isAuthenticated();
    }

    showMessage(msg: string) {
        this.snackBar.open(msg, null, {duration: 1500});
    }

    requestAction() {
        this.snackBar.open('There is something unsaved, please save/cancel it before next step!', 'OK');
    }

    ngOnInit(): void {
        this.globals.messageShow.subscribe(res => {
            const msg = res;
            if (msg === 'UNSAVEDWARNING') {
                this.requestAction();
            } else {
                this.showMessage(msg);
            }
        });
    }

    clear() {
        this.globals.setContent('');
    }

    getIcon(type: string): string {
        return this.globals.getIcon(type);
    }
}
