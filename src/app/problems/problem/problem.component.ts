import {Component, OnInit, ViewChild} from '@angular/core';
import {Problem} from '../../shared/models/problem.model';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {DatabaseService} from '../../core/services/database/database.service';
import {MatSnackBar} from '@angular/material';
import {EditProblemComponent} from './edit-problem/edit-problem.component';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {
  private problem$: Observable<any>;
  private editMode = false;

  @ViewChild(EditProblemComponent, {static: false}) editCmp;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private sb: MatSnackBar,
              private db: DatabaseService) {
  }

  ngOnInit() {
    this.problem$ = this.route.params.pipe(
      switchMap((params: Params) => {
        if (!params.id) {
          return of({});
        }
        const id = params.id;
        return this.db.object(`problems/${id}`, Problem);
      })
    );
  }

  toggleEditMode() {
    if (this.editMode) {
      this.editCmp.saveProblem();
    }
    this.editMode = !this.editMode;
  }

  goToList() {
    this.router.navigate(['/app', 'problems']);
  }
}
