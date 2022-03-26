import { DonorsService } from 'src/app/services/donors.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pageCount: number = -1;	
  @Output() onPageSelected: EventEmitter<number> = new EventEmitter();
	pages: number[] = [];
  activePage: number = 1;
  
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  constructor(private service: DonorsService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.pages = [];
    for (let it = 1; it <= this.pageCount; it++){
      this.pages.push(it);
    }
  }

  pageSelected(newPage :number){
    this.activePage = newPage;
    this.onPageSelected.emit(this.activePage);
  }

 /* getAll() {
    this.service.getAllDonors().subscribe(x => {
      this.donor = x;
    })
  }*/

}
