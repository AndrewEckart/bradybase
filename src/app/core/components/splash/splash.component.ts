import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  private title = 'bradybase';

  constructor() { }

  ngOnInit() {
  }

}
