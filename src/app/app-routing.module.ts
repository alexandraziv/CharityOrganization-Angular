import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { DonorDetailsComponent } from './donors/donor-details/donor-details.component';
import { DonorListComponent } from './donors/donor-list/donor-list.component';

/*const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'donors', component: DonorListComponent },
  { path: 'donors/new', component: DonorDetailsComponent },
  { path: 'donors/:id/details', component: DonorDetailsComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];*/

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "donors", component: DonorListComponent},
  {path: "details", component: DonorDetailsComponent},
  {path: "details/:id", component: DonorDetailsComponent},
  {path: "", redirectTo: "home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
