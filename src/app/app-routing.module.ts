import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegisterComponent } from './component/register/register.component';
import { BookInfoComponent } from './component/book-info/book-info.component';

const routes: Routes = [
  {path:'', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'login',component:LoginComponent},
  {path: 'dashboard',component:DashboardComponent},
  {path: 'register',component:RegisterComponent},
  {path: 'bookInfo/:id', component:BookInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
