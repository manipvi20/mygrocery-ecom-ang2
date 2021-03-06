import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {Http} from "@angular/http";

@Component({
  selector: 'mpp',
  templateUrl: './mpp.component.html'
})
export class MppComponent implements OnInit {
    title:string = 'MPP';
    breadcums: string = 'mpp';
    products: any[] = [];
    constructor(
        private activatedRoute: ActivatedRoute,
        private http: Http
    ) {  }
    ngOnInit() {
        var cat = this.activatedRoute.params.subscribe(params => {
            var cat = params['catagory'];

            if(!cat)
                return
            
            this.http.get('products/'+ cat)
            .subscribe(
                (prod: any) => {
                    this.products = prod.json();
                },
                err => { if(err) console.log(err + " Something went wrong!!")},
                () =>{ }
            )
        })
    }

}
