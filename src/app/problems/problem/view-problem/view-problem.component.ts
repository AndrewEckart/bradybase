import {Component, Input, OnInit} from '@angular/core';
import {Problem} from '../../../shared/models/problem.model';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {ProblemRecord} from '../../../shared/interfaces/problemRecord.interface';

@Component({
  selector: 'app-view-problem',
  templateUrl: './view-problem.component.html',
  styleUrls: ['./view-problem.component.scss']
})
export class ViewProblemComponent implements OnInit {
  @Input() private problem: Problem;
  private dataSource: MatTableDataSource<ProblemRecord>;
  private displayedColumns: string[] = ['course', 'quarter', 'year', 'type', 'number'];

  constructor(
    private sb: MatSnackBar
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<ProblemRecord>(this.problem.records);
  }

  copy() {
    navigator.clipboard.writeText(this.problem.statement)
      .then(() => {
        this.sb.open('Copied!', null, {duration: 2000});
      })
      .catch((error) => console.error(error));
  }

}
