import { DonorsList } from '../model/donors-list';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Donor } from '../model/donor';


const baseUrl: string = "http://localhost:3000/api";
const URL_CATEGORIES: string = "http://localhost:3000/api/categories";

@Injectable({
	providedIn: 'root'
})
export class DonorsService {

	//importovali smo HttpClient i injektovali ga u konstruktor
	constructor(private http: HttpClient) { }



	/* U objektu params smo napravili sve parametre koje server može da primi (znamo koji su na osnovu datog API-ja servera).*/
	//getAll metoda se obraca serveru u cilju dobavljanja svih objekata sa servera. 
	//Podatke sa servera smo konvertovali u modelu podataka koji sadrzi count i results iz JSON-a.	
	getAllDonors(params?: any): Observable<DonorsList> {
		//na osnovu parametara koji smo dobili od komponente, pravimo js objekat  
		let queryParams: any = {};
		if (params) {
			queryParams = {
				params: new HttpParams()
					.set("pageSize", params.pageSize && params.pageSize.toString() || "")
					.set("page", params.page && params.page.toString() || "")
					.set("filter", params.filter && JSON.stringify(params.filter) || "")
					.set("sort", params.sort && params.sort.toString() || "")
					.set("sortDirection", params.sortDirection && params.sortDirection.toString() || "")
			}
		}
		return this.http.get(`${baseUrl}/donors`, queryParams).pipe(map(
			data => { return new DonorsList(data) }
		));
	}


	//Na serveru je niz stringova koji nam trebaju za select.
	getCategories(): Observable<string[]> {
	return this.http.get(URL_CATEGORIES).pipe(map(response => {
			return response as string[];
		}));
	}	
	

	/*getSpecialties(): Observable<string[]> {
		return this.http.get(`${baseURL}/specialties`).pipe(map(response => {
		  return response as string[];
		}))
	  }*/


	
	get(id: number): Observable<Donor> {
		return this.http.get(`${baseUrl}/donors/${id}`).pipe(map(
			(jsonResponse: any) => { return new Donor(jsonResponse); }
		));
	}

	//submit <!-- [routerLink]="['/doctors/', doctor._id]"
	add(newDonor: Donor): Observable<Donor> {
		return this.http.post(`${baseUrl}/donors/`, newDonor)
			.pipe(map((jsonResponse: any) => new Donor(jsonResponse)));
	}

	update(donor: Donor): Observable<Donor> {
		return this.http.put(baseUrl + "/donors/" + donor._id, donor)
			.pipe(map((jsonResponse: any) => new Donor(jsonResponse)));
	}

	remove(id: number): Observable<any> {
		return this.http.delete(`${baseUrl}/donors/${id}`)
			.pipe(map((jsonResponse: any) => new Donor(jsonResponse)));
	}


}
