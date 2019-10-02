import {Component, OnInit} from '@angular/core';
import {Problem} from '../../shared/models/problem.model';
import {FormGroup} from '@angular/forms';
import {DatabaseService} from '../../core/services/database/database.service';
import {AuthService} from '../../core/services/auth/auth.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.scss']
})
export class NewProblemComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private db: DatabaseService,
    private router: Router,
    private sb: MatSnackBar
  ) { }

  ngOnInit() { }

  cancel() {
    this.router.navigate(['/app', 'problems']);
  }

  save(form: FormGroup) {
    if (form.invalid) {
      return console.error('Form is invalid!');
    }
    const problem = new Problem(form.value);
    problem.createdBy = this.auth.authState.uid;
    problem.updatedBy = this.auth.authState.uid;
    this.db.push('problems', problem.save())
      .then(() => {
        this.sb.open('Saved!', null, {duration: 2000});
        this.router.navigate(['/app', 'problems']);
      })
      .catch((error) => {
        console.error(error);
        this.sb.open('Error saving data', null, {duration: 5000});
      });
  }
}
