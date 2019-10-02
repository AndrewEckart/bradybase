import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ProblemType, Season} from '../../core/constants';

@Component({
  selector: 'app-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.scss']
})
export class RecordFormComponent implements OnInit {
  @Input() formGrp: FormGroup;
  private seasons = Object.keys(Season);
  private types = Object.keys(ProblemType);
  private maxYear = (new Date()).getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
