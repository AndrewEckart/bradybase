import * as _ from 'lodash';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {PLACEHOLDERS, tags} from '../../core/constants';
import {Problem} from '../../shared/models/problem.model';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';

@Component({
  selector: 'app-problem-form',
  templateUrl: './problem-form.component.html',
  styleUrls: ['./problem-form.component.scss']
})
export class ProblemFormComponent implements OnInit {
  public problemForm: FormGroup;
  private placeholders = PLACEHOLDERS;
  private _problem: Problem;

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
    this.setupForm();
  }

  setupForm() {
    this.problemForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      statement: new FormControl('', [Validators.required]),
      tags: new FormControl([], [])
    });
    this.tagCtrl = this.problemForm.controls.tags;
    if (this._problem) {
      this.problemForm.patchValue(this._problem);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = event.value;
    if ((value || '').trim()) {
      this.tagCtrl.setValue(_.uniq(this.tagCtrl.value.concat(value.trim())));
    }

    event.input.value = '';
    this.filterTags();
  }

  remove(tag: string): void {
    this.tagCtrl.setValue(_.without(this.tagCtrl.value, tag));
    this.filterTags();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
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
}
