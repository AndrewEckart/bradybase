import {Component, Input, OnInit} from '@angular/core';
import {Problem} from '../../../shared/models/problem.model';

@Component({
  selector: 'app-view-problem',
  templateUrl: './view-problem.component.html',
  styleUrls: ['./view-problem.component.scss']
})
export class ViewProblemComponent implements OnInit {
  @Input() private problem: Problem;

  constructor() { }

  ngOnInit() {
  }

}
