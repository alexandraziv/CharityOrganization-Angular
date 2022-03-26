import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DonorsList } from 'src/app/model/donors-list';
import { DonorsService } from 'src/app/services/donors.service';
import { DonorListComponent } from '../donor-list/donor-list.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  donor: DonorsList = new DonorsList();

  @Output() search: EventEmitter<string> = new EventEmitter();
  @Input() categories: Array<string> = [];
  searchForm: FormGroup;
  

  constructor(private builder: FormBuilder, private service : DonorsService) {
    this.searchForm = this.builder.group({
      searchText: ""
    })
  }

  ngOnInit(): void {
    this.getAll()
  }

  onSearch(): void {
    this.search.emit(this.searchForm.value);
  }

  getAll() {
    this.service.getAllDonors().subscribe(x => {
      this.donor = x;
    })
  }

  getCategories() {
    this.service.getCategories().subscribe((result:any) => {
      this.categories = result;
      let index = this.categories.findIndex(elem => elem == "donations");
      if (index != -1) {
        this.categories[index] = "donation";
      }
    })
  }

  /*onSearch(searchString: string) {
    this.search.emit(this.searchForm.value.filterWines(searchString));
  }*/
}
