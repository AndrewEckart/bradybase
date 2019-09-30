import {Injectable} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SidenavService {
  public nav$: BehaviorSubject<MatSidenav> = new BehaviorSubject<MatSidenav>(null);
  public nav: MatSidenav;

  constructor() { }

  public open() {
    if (!!this.nav) {
      this.nav.opened = true;
    }
  }

  public close() {
    if (!!this.nav) {
      this.nav.opened = false;
    }
  }

  public toggle() {
    if (!!this.nav) {
      this.nav.opened = !this.nav.opened;
    }
  }

}
