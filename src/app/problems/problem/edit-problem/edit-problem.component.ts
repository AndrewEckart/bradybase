import * as _ from 'lodash';
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Problem} from '../../../shared/models/problem.model';
import {ProblemFormComponent} from '../../problem-form/problem-form.component';
import {DatabaseService} from '../../../core/services/database/database.service';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../../../core/services/auth/auth.service';
import {Form, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-problem',
  templateUrl: './edit-problem.component.html',
  styleUrls: ['./edit-problem.component.scss']
})
export class EditProblemComponent implements OnInit, AfterViewInit {
  @Input() problem: Problem;
  public fg: FormGroup;

  @ViewChild(ProblemFormComponent, {static: true}) formCmp: ProblemFormComponent;

  constructor(
    private auth: AuthService,
    private db: DatabaseService,
    private sb: MatSnackBar
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.fg = this.formCmp.problemForm;
  }

  saveProblem() {
    if (this.fg.invalid || _.isEqual(this.fg.value, _.pick(this.problem, _.keys(this.fg.value)))) {
      return;
    }
    _.assign(this.problem, this.fg.value);
    this.problem.updatedBy = this.auth.authState.uid;
    this.db.update(`problems/${this.problem.uid}`, this.problem.save())
      .then(() => {
        this.sb.open('Changes saved!', null, {duration: 2000});
      })
      .catch((error) => {
        console.error(error);
        this.sb.open('Error saving changes', null, {duration: 5000});
      });
  }
}
