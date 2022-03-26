import { DonorsList } from '../../model/donors-list';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Donor } from 'src/app/model/donor';
import { DonorsService } from 'src/app/services/donors.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  //model podataka za tabelu
  donor: DonorsList = new DonorsList();

  @Input() donors: Donor[] = [];
  @Output() donorDeleted: EventEmitter<number> = new EventEmitter();
  @Output() sortCriteriaChanged: EventEmitter<any> = new EventEmitter();

  constructor(private service: DonorsService) { }


  //SAMO OVDE OBRISATI IZ TABELE DA OSVEZI!!!!!!
  ngOnInit(): void {
    this.getAll();
  }


  getAll() {
    this.service.getAllDonors().subscribe(x => {
      this.donor = x;
    })
  }

  onDelete(id: number) {
    this.donorDeleted.emit(id);
  };
  
  onSortCriteriaChanged(criteria: string): void {
    this.sortCriteriaChanged.emit(criteria);
  }
}

