import { Injectable } from '@angular/core';
import {CanActivate} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GaurdService implements CanActivate {

  constructor() { }
  canActivate() {
    if(localStorage.getItem('loggedIn'))
    return true;
    else
    return false;
  }
}
