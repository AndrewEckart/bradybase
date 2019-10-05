import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Problem} from '../../shared/models/problem.model';
import {SelectionModel} from '@angular/cdk/collections';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {AsyncComponent} from '../../shared/components/async/async.component';
import {BehaviorSubject} from 'rxjs';
import {DatabaseService} from '../../core/services/database/database.service';
import {Router} from '@angular/router';
import {I18nPluralPipe} from '@angular/common';

@Component({
  selector: 'app-problems-list',
  templateUrl: './problems-list.component.html',
  styleUrls: ['./problems-list.component.scss']
})
export class ProblemsListComponent extends AsyncComponent implements OnInit, AfterViewInit {
  private dataSource: MatTableDataSource<Problem>;
  private selection = new SelectionModel<Problem>(true);

  private filter$ = new BehaviorSubject<string>('');

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private displayedColumns: string[] = ['select', 'name', 'options'];
  public pluralMapping: { [k: string]: string } = {
    '=1': 'One problem',
    other: '# problems'
  };

  static createFilter(problem: Problem, filter: string): boolean {
    return problem.name.toLowerCase().includes(filter.toLowerCase());
  }

  constructor(
    private pluralPipe: I18nPluralPipe,
    private db: DatabaseService,
    private router: Router,
    private sb: MatSnackBar
  ) {
    super();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Problem>();
    this.dataSource.filterPredicate = ProblemsListComponent.createFilter;
    this.observeProblems();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.observeFilter();
  }

  observeProblems() {
    this.db.list('problems', Problem).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((problems: Problem[]) => {
        this.dataSource.data = problems;
      });
  }

  observeFilter() {
    this.filter$.asObservable().pipe(
      debounceTime(150),
      distinctUntilChanged(),
      takeUntil(this.ngUnsubscribe)
    ).subscribe((value: string) => {
      if (!this.dataSource) {
        return;
      }
      this.dataSource.filter = value;
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  create() {
    this.router.navigate(['/app/create']);
  }

  remove(problem: Problem, showMessage = true) {
    this.selection.deselect(problem);
    return this.db.set(`problems/${problem.uid}`, null)
      .then(() => {
        if (showMessage) {
          this.sb.open(`Deleted ${problem.name}`, null, {duration: 2000});
        }
        if (this.dataSource.filteredData.length === this.dataSource.paginator.pageSize + 1) {
          this.dataSource.paginator.pageIndex = 0;
        }
      })
      .catch((error) => {
        console.error(error);
        if (showMessage) {
          this.sb.open(`Error during deletion`, null, {duration: 5000});
        }
      });
  }

  removeMultiple(problems: Problem[]) {
    this.selection.clear();
    Promise.all(problems.map((problem: Problem) => {
      return this.remove(problem, false);
    }))
      .then(() => {
        const value = this.pluralPipe.transform(problems.length, this.pluralMapping);
        this.sb.open(`Deleted ${value}`, null, {duration: 2000});
      })
      .catch((error) => {
        console.error(error);
        this.sb.open(`Error during deletion`, null, {duration: 5000});
      });
  }

}
