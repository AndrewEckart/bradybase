import {Component, Input, OnInit} from '@angular/core';
import {Problem} from '../../models/problem.model';

@Component({
  selector: 'app-view-problem',
  templateUrl: './view-problem.component.html',
  styleUrls: ['./view-problem.component.css']
})
export class ViewProblemComponent implements OnInit {
  @Input() private problem: Problem;

  constructor() { }

  ngOnInit() {
  }

}
