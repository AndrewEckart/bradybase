import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProblemComponent } from './problem/problem.component';
import { ViewProblemComponent } from './problem/view-problem/view-problem.component';
import { EditProblemComponent } from './problem/edit-problem/edit-problem.component';
import { CardComponent } from './layout/card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LetDirective} from './directives/let/let.directive';
import {ReactiveFormsModule} from '@angular/forms';
import {KatexModule} from 'ng-katex';
import { ChipListComponent } from './forms/chip-list/chip-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ProblemComponent,
    ViewProblemComponent,
    EditProblemComponent,
    CardComponent,
    LetDirective,
    ChipListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    KatexModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
