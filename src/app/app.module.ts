import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbCalendar, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { DonorDetailsComponent } from './donors/donor-details/donor-details.component';
import { DonorListComponent } from './donors/donor-list/donor-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './donors/table/table.component';
import { SearchComponent } from './donors/search/search.component';
import { PaginationComponent } from './donors/pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DonorDetailsComponent,
    DonorListComponent,
    TableComponent,
    SearchComponent,
    PaginationComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
