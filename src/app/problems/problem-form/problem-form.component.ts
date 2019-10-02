import * as _ from 'lodash';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {PLACEHOLDERS, tags} from '../../core/constants';
import {Problem} from '../../shared/models/problem.model';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {ProblemRecord} from '../../shared/interfaces/problemRecord.interface';

@Component({
  selector: 'app-problem-form',
  templateUrl: './problem-form.component.html',
  styleUrls: ['./problem-form.component.scss']
})
export class ProblemFormComponent implements OnInit {
  public problemForm: FormGroup;
  private placeholders = PLACEHOLDERS;
  private _problem: Problem;

  private recordArray: FormArray;
  private newRecordForm: FormGroup;

  @Input()
  set problem(problem: Problem) {
    if (this.problemForm && problem) {
      this.problemForm.patchValue(problem);
    }
    this._problem = problem;
  }

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl: AbstractControl;
  allTags: string[] = tags;
  filtered: string[] = tags;

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor() { }

  ngOnInit() {
    this.setupForms();
  }

  setupForms() {
    this.problemForm = new FormGroup({
      author: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      notes: new FormControl(''),
      records: new FormArray([]),
      statement: new FormControl('', [Validators.required]),
      tags: new FormControl([], [])
    });
    this.newRecordForm = new FormGroup({
      course: new FormControl('', [Validators.required]),
      problemNumber: new FormControl(null),
      quarter: new FormControl(null, [Validators.required]),
      type: new FormControl(null),
      typeNumber: new FormControl(null),
      year: new FormControl((new Date()).getFullYear(), [Validators.required])
    });
    this.recordArray = this.problemForm.controls.records as FormArray;
    this.tagCtrl = this.problemForm.controls.tags;
    if (this._problem) {
      this.problemForm.patchValue(this._problem);
      if (this._problem.records) {
        this._problem.records.forEach((record: ProblemRecord) => {
          this.addRecordFormGrp(record);
        });
      }
    }

  }

  addTag(event: MatChipInputEvent): void {
    const value = event.value;
    if ((value || '').trim()) {
      this.tagCtrl.setValue(_.uniq(this.tagCtrl.value.concat(value.trim())));
    }

    event.input.value = '';
    this.filterTags();
  }

  removeTag(tag: string): void {
    this.tagCtrl.setValue(_.without(this.tagCtrl.value, tag));
    this.filterTags();
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    this.tagCtrl.setValue(this.tagCtrl.value.concat(event.option.value));
    this.tagInput.nativeElement.value = '';
    this.filterTags();
  }

  filterTags() {
    const value = this.tagInput.nativeElement.value;
    const remaining = _.difference(this.allTags, this.tagCtrl.value);
    if (!value) {
      this.filtered = remaining;
    } else {
      this.filtered = remaining.filter(tag => tag.toLowerCase().indexOf(value.toLowerCase()) === 0);
    }
  }

  addRecordFormGrp(record: ProblemRecord) {
    this.recordArray.push(new FormGroup({
      course: new FormControl(record.course, [Validators.required]),
      problemNumber: new FormControl(record.problemNumber),
      quarter: new FormControl(record.quarter, [Validators.required]),
      type: new FormControl(record.type),
      typeNumber: new FormControl(record.typeNumber),
      year: new FormControl(record.year, [Validators.required])
    }));
  }

  addRecord() {
    if (this.newRecordForm.invalid) {
      return console.error('Form invalid!');
    }

    this.addRecordFormGrp(this.newRecordForm.value);
    this.newRecordForm.reset({year: (new Date().getFullYear())});
  }

  removeRecord(i: number) {
    this.recordArray.removeAt(i);
  }
}
