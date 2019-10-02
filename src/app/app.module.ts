import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProblemComponent } from './problems/problem/problem.component';
import { ViewProblemComponent } from './problems/problem/view-problem/view-problem.component';
import { EditProblemComponent } from './problems/problem/edit-problem/edit-problem.component';
import { CardComponent } from './shared/components/card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatPaginatorModule, MatSidenavModule, MatSnackBarModule, MatSortModule, MatTableModule, MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LetDirective} from './shared/directives/let/let.directive';
import {ReactiveFormsModule} from '@angular/forms';
import {KatexModule} from 'ng-katex';
import { ChipListComponent } from './shared/components/chip-list/chip-list.component';
import { LoginComponent } from './core/components/login/login.component';
import {AuthService} from './core/services/auth/auth.service';
import {AuthGuard} from './core/guards/auth/auth.guard';
import { HeaderComponent } from './core/components/header/header.component';
import { NewProblemComponent } from './problems/new-problem/new-problem.component';
import { ProblemsListComponent } from './problems/problems-list/problems-list.component';
import {AppRoutingModule} from './app-routing.module';
import { SplashComponent } from './core/components/splash/splash.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {DatabaseService} from './core/services/database/database.service';
import { HomeComponent } from './core/components/home/home.component';
import {SidenavService} from './core/services/sidenav/sidenav.service';
import { UserPhotoComponent } from './shared/components/user-photo/user-photo.component';
import { UserPanelComponent } from './core/components/user-panel/user-panel.component';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { ProblemFormComponent } from './problems/problem-form/problem-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ProblemComponent,
    ViewProblemComponent,
    EditProblemComponent,
    CardComponent,
    LetDirective,
    ChipListComponent,
    LoginComponent,
    HeaderComponent,
    NewProblemComponent,
    ProblemsListComponent,
    SplashComponent,
    HomeComponent,
    UserPhotoComponent,
    UserPanelComponent,
    SidenavComponent,
    ProblemFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatSortModule,
    KatexModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    DatabaseService,
    SidenavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
