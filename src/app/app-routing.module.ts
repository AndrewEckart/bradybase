import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NewProblemComponent} from './problems/new-problem/new-problem.component';
import {AuthGuard} from './core/guards/auth/auth.guard';
import {ProblemsListComponent} from './problems/problems-list/problems-list.component';
import {ProblemComponent} from './problems/problem/problem.component';
import {SplashComponent} from './core/components/splash/splash.component';
import {HomeComponent} from './core/components/home/home.component';


const appRoutes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'login', redirectTo: '' },

  { path: 'app',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'create', component: NewProblemComponent},
      { path: 'problems', component: ProblemsListComponent},
      { path: 'problems/:id', component: ProblemComponent}
    ]
  }


];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
      // enableTracing: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
