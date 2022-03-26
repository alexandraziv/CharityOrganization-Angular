import { Donor } from "./donor";

export class DonorsList {

    //JSON PODACI SA SERVERA . results i count.
    //obrati paznju na server, niz se zove donors. 
    count: number;
    donors: Donor[];
    

    // pomocu map/operators  konvertujemo JS niz iz JSON-a i vracamo objekat po objekat sa servera.
    constructor(obj?:any) {
        this.donors= obj && obj.donors.map((elem:any) => { return new Donor(elem)}) || [];
        this.count = obj && obj.count || 0;
    }
}