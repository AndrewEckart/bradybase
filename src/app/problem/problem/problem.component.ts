import { Component, OnInit } from '@angular/core';
import {Problem} from '../../shared/models/problem.model';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {
  private problem = new Problem();
  private editMode = true;

  constructor() { }

  ngOnInit() {
  }

}
