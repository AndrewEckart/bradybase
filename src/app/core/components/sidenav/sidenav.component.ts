import { Component, OnInit } from '@angular/core';
import {SidenavService} from '../../services/sidenav/sidenav.service';
import {SidenavLink} from '../../../shared/interfaces/sidenavLink.interface';
import {SidenavLinks} from '../../constants';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  private links: SidenavLink[];

  constructor(
    private sidenavService: SidenavService
  ) { }

  ngOnInit() {
    this.links = SidenavLinks;
  }

}
