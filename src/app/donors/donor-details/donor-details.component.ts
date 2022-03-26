import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct, NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Donor } from 'src/app/model/donor';
import { DonorsService } from 'src/app/services/donors.service';

@Component({
  selector: 'app-donor-details',
  templateUrl: './donor-details.component.html',
  styleUrls: ['./donor-details.component.css']
})
  
export class DonorDetailsComponent implements OnInit {

  donorForm: FormGroup;
  
  //model podataka, kome imamo pristup u templejtu.
  donor: Donor = new Donor();

  categories: Array<string> = [];

  day: NgbDateStruct = { day: 0, month: 0, year: 0 };
  hour: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']


  @Output() donorDeleted: EventEmitter<number> = new EventEmitter();
  @Output() sortCriteriaChanged: EventEmitter<any> = new EventEmitter();
  

  constructor(private fb: FormBuilder,
    private service: DonorsService,
    private router: Router,
    private route: ActivatedRoute,
    private calendar: NgbCalendar) {
    
    this.donorForm = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', [Validators.required, Validators.minLength(10)]],
      'charity_date': [{}, [Validators.required]],
      'categories': ['', [Validators.required]],
      'estimated_value': ['', Validators.required]
    });
  }

  
  ngOnInit() {
    
    this.service.getCategories().subscribe(data => {
      this.categories = data;
      
    });


    let id: number = Number(this.route.snapshot.params["id"]);
    if (id) {
      this.service.get(Number(id)).subscribe(data => {
        this.donor = data;
        let date = new Date(this.donor.charity_date);
        ////patch value za azuriranje forme.
        this.donorForm.patchValue(this.donor);
        this.donorForm.controls['charity_date'].setValue({
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate()
        })
      });
    }
  }

  /* o dodavanju nove forme ili ažuriranju postojeće na osnovu toga da li je id 
 parametar definisan*/
  
 onSubmit(): void {
	 
  let submittedDonor: Donor = new Donor(this.donorForm.value);
  let ngbDate = this.donorForm.controls['charity_date'].value;
  let myDate = new Date(ngbDate.year, ngbDate.month, ngbDate.day).toISOString();
   submittedDonor.charity_date = String(myDate);
   
  if (this.donor && this.donor._id) {
    submittedDonor._id = this.donor._id;
    this.service.update(submittedDonor).subscribe({
      next: (data: any) => {
        alert("Updated!");
        this.router.navigate(['/donors']);
      }
    });
  } else {
    this.service.add(submittedDonor).subscribe({
      next: (data: any) => {
        alert("Successfully added!")
        this.router.navigate(['/donors'])
      }
    });
  }
 }
  
}

/*onRevert() {
  this.donorsForm.patchValue(this.pizza);
  // console.log(this.pizzaForm.controls.errors);
}


  
  //dugme za vracanje informacija iz prethodnog submita.
/*	onRevert() {
		this.donorForm.patchValue(this.donor);
		// console.log(this.pizzaForm.controls.errors);
	}*/


  

