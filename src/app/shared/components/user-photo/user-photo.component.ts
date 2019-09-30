import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.scss']
})
export class UserPhotoComponent implements OnInit {
  private _src = 'assets/default-photo.png';
  @Input() set src(value: string) {
    this._src = !!value ? value : 'assets/default-photo.png';
  }
  @Input() size = 40;

  constructor() { }

  ngOnInit() {
  }

}
