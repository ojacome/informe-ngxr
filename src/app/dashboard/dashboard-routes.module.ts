import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { routesDashboard } from './dashboar.routes';
import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [
  { 
        path: '',                 
        component: DashboardComponent,
        children: routesDashboard,
        // canActivate: [ AngularFireAuthGuard ],
        // data: { authGuardPipe: redirectUnauthorizedToLogin }
    },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
