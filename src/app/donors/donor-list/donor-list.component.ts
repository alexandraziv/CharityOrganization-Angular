import { DonorsList } from 'src/app/model/donors-list';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Donor } from 'src/app/model/donor';
import { DonorsService } from 'src/app/services/donors.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const PAGE_SIZE = 5;

@Component({
  selector: 'app-donor-list',
  templateUrl: './donor-list.component.html',
  styleUrls: ['./donor-list.component.css']
})
export class DonorListComponent implements OnInit {

   //Ova komponenta GLAVNA treba da nam prikaze podatke sa servera, jer u servisu
  //samo cuvamo vrednosti koje smo konvertovali u modelu,
  //a ovde ih prikazujemo da ne budzimo kod bzvz!!! dakle, iz modela uzimamo count
  //i niz u koji smo pusovali sve IZ MODELA PODATAKA NIZ
 // donorList: DonorsList = new DonorsList();

  donors: Donor[] = [];
  count: number = -1;
  
  pageCount = -1;

  categories: Array<string> = [];

  params: any = {
    page: 1,
    pageSize: 6,
    sort: '',
    sortDirection: 'asc',
    filter: {
      categories: undefined,
      minValue: '',
      maxValue: ''
    }
  }

  constructor(private service: DonorsService) { }


  ngOnInit(): void {

    
    
    this.service.getCategories().subscribe(data => {
      this.categories = data;
     let index = this.categories.findIndex(elem => elem == "donations");
     if (index != -1) {
       this.categories[index] = "donation";
      }
    });
    this.getAllDonors();
  }


   
 getAllDonors() {
  this.service.getAllDonors(this.params).subscribe({
    next: (response: DonorsList) => {
      this.donors = response.donors;
      this.count = response.count;
      //this.params.pageSize = Math.ceil(this.count/6);
    },
    error: error => {
      alert("Error in getting data from server!")
      }
  });
}


  //NA SVKOM TS-U OVO RADIMO, PRAVIMO GORE NOVI OBJEKAT MODELA I PUNIMO GA!
  /*updateDonors() {
    this.service.getAllDonors(this.params).subscribe(data => {
      this.donorList = data;
    });
  }*/

  onSearch(searchText: string): void {
    this.params.filter.name = searchText;
    this.params.filter.categories = searchText;
    this.params.filter.minValue = searchText;
    this.params.filter.maxValue = searchText;
    this.ngOnInit();
  }

   //ne treba nam ako imamo ngb pagination. inace treba 
  setPage(newPage: number) {
    this.params.page = newPage;
    this.getAllDonors();
  }

  

  //uzmi iz servisa da ih prikaze u ovom html-u.
  getCategories() {
    this.service.getCategories().subscribe(result => {
      this.categories = result;
      let index = this.categories.findIndex(elem => elem == "donations");
      if (index != -1) {
        this.categories[index] = "donation";
      }
    })
  }



//(click)="onDelete(pizza._id)" - ovim smo u detetu izbrisali picu i emitujemo je ovde
  //roditelju da je ZAISTA OBRISE
  // dete- table ima Output donorDeleted emiter! i napravljenju
  //funkciju koja treba da je emituje! onDelete
  //-- <app-table (donorDeleted)="onDonorDeleted($event)"
onDonorDeleted(id: number): void {
  this.service.remove(id).subscribe({
    next: (data: DonorsList) => {
      this.getAllDonors();
    }
  });
}

  
//sortiranje tabele
onSortCriteriaChanged(criteria: string): void {
  if (this.params.sort == criteria) {
    this.params.sortDirection = (this.params.sortDirection == "asc")? "desc": "asc";
  } else {
    this.params.sort = criteria;
    this.params.sortDirection = "asc";
  }
  this.getAllDonors();
  }  
  
  //event pozivamo u paginaciji <pagination (onPageSelected)="changePage($event)"
  changePage(newPage: number): void {
    this.params.page = newPage;
    this.getAllDonors();
  }

}
