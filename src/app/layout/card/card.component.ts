import {Component, Input, OnInit} from '@angular/core';
import {CARD_WIDTHS} from '../../core/constants';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  public widths = CARD_WIDTHS;
  @Input() public visible = true;
  @Input() public dark = false;

  // use margins to ensure visible shadow when cards are used within mat-tabs
  @Input() public bottomMargin = 0;
  @Input() public horizMargin = 0;

  constructor() { }

  ngOnInit() {
  }

}
