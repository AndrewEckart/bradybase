import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Problem} from '../../shared/models/problem.model';
import {SelectionModel} from '@angular/cdk/collections';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {AsyncComponent} from '../../shared/components/async/async.component';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-problems-list',
  templateUrl: './problems-list.component.html',
  styleUrls: ['./problems-list.component.scss']
})
export class ProblemsListComponent extends AsyncComponent implements OnInit, AfterViewInit {
  private dataSource: MatTableDataSource<Problem>;
  private selection = new SelectionModel<Problem>(true, []);

  private filter$ = new BehaviorSubject<string>('');

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private displayedColumns: string[] = ['select', 'name'];

  static createFilter(problem: Problem, filter: string): boolean {
    return problem.name.toLowerCase().includes(filter.toLowerCase());
  }

  constructor() {
    super();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Problem>();
    this.dataSource.filterPredicate = ProblemsListComponent.createFilter;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.observeFilter();
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
    })
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


}
