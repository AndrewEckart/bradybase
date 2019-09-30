import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SidenavService} from '../../services/sidenav/sidenav.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  public showPanel = false;
  public logoURL = 'assets/uc-shield.svg';

  constructor(
    private sidenavService: SidenavService,
    private auth: AuthService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  togglePanel() {
    this.showPanel = !this.showPanel;
  }

}
