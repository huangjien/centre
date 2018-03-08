import { Component } from '@angular/core';
import { OktaAuthService } from './app.service';

@Component({ template: `` })
export class CallbackComponent {

  constructor(private okta: OktaAuthService) {
    // Handles the response from Okta and parses tokens
    okta.handleAuthentication();
  }
}
