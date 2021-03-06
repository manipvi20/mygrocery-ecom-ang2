import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DataService } from "./share-service";
import {Http} from "@angular/http";

@Component({
  selector: 'app-spp',
  templateUrl: './spp.component.html',
  styleUrls: ['./spp.component.css']
})
export class SppComponent implements OnInit {
    title:string = 'SPP';
    breadcums: string = 'spp';
    product:any = {};
    products:any[] =[];
    items = [];    

    constructor(
      private activatedRoute: ActivatedRoute,
      private data: DataService,
      private http: Http) {  }
    ngOnInit() {
      var id = this.activatedRoute.params.subscribe(params => {
        var id = params['id'];
        if(!id)
            return
        
        this.http.get('product/'+ id)
        .subscribe(
            (prod: any) => {
                this.product = prod.json();
            },
            err=> {},
            ()=>{console.log(this.product)}
        )
      });
      this.getTodayOfferPrd('todayOfferProducts');
    }

    getTodayOfferPrd(offer_type) {

      this.http.get(offer_type)
        .subscribe(
            (prod: any) => {
                this.products = prod.json();
            },
            err => { if(err) console.log(err + " Something went wrong!!")},
            () =>{ }
        )
    }
    
    addtocart($event) {
      this.data.changeCart($event);
    }

}
