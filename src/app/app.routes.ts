import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { EmployeeComponent } from './employee-component/employee-component';
import { authGuard } from './shared/auth-guard';
import { NopageComponent } from './nopage-component/nopage-component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { 
        path: 'employee', 
        component: EmployeeComponent, 
        canActivate: [authGuard]
    },
    { path: '**', component: NopageComponent}
];
