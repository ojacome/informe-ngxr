import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { routesDashboard } from './dashboard/dashboar.routes';
import { DashboardComponent } from './dashboard/dashboard.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);




export const routes: Routes = [
    { path: 'login',            component: LoginComponent },
    { path: 'register',         component: RegisterComponent },
    { 
        path: '',                 
        component: DashboardComponent,
        children: routesDashboard,
        canActivate: [ AngularFireAuthGuard ],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
    },
    { path: '**',  redirectTo: ''},
]

@NgModule({
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [ 
        RouterModule
    ]
})
export class AppRoutingModule{}