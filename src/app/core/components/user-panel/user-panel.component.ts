import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {BradybaseUser} from '../../../shared/models/bradybaseUser.model';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {
  private user$: Observable<BradybaseUser>;
  private toolbarHeight = 64;

  private firstClick = true;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user$ = this.authService.currentUserObservable;
  }

  signOut() {
    this.authService.signOut();
  }

  @HostListener('document:click', ['$event'])
  onClick(event) {
    if (this.firstClick) {
      this.firstClick = false;
    } else {
      let clickedComponent = event.target;
      let inside = false;
      do {
        if (clickedComponent === this.elementRef.nativeElement) {
          inside = true;
        }
        clickedComponent = clickedComponent.parentNode;
      } while (clickedComponent);

      if (!inside) {
        this.close.emit();
      }
    }
  }

}
