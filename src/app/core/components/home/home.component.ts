import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SidenavService} from '../../services/sidenav/sidenav.service';
import {MatSidenav} from '@angular/material';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {AsyncComponent} from '../../../shared/components/async/async.component';
import {takeUntil} from 'rxjs/operators';
import {toolbarHeight, toolbarHeightXS} from '../../constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends AsyncComponent implements OnInit, AfterViewInit {
  private toolbarHeight = toolbarHeight;
  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;

  constructor(
    private media: MediaObserver,
    private sidenavService: SidenavService
  ) {
    super();
  }

  ngOnInit() {
    this.observeMedia();
  }

  ngAfterViewInit() {
    this.sidenavService.nav = this.sidenav;
    this.sidenavService.nav$.next(this.sidenav);
  }

  observeMedia() {
    this.media.asObservable().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(() => {
      this.toolbarHeight = this.media.isActive('xs') ? toolbarHeightXS : toolbarHeight;
    });
  }

}
