import { Component, OnInit } from '@angular/core';
import { ProductSerivces } from "./app.services";
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
      private productServices: ProductSerivces,
      private activatedRoute: ActivatedRoute,
      private data: DataService,
      private http: Http) {  }
    ngOnInit() {
      var id = this.activatedRoute.params.subscribe(params => {
        var id = params['id'];
        if(!id)
            return

        this.productServices.getProduct(id).subscribe(
            prod => {
                this.product = prod
                },
            err => { if(err) console.log(err + " Something went wrong!!")},
            () =>{  }
        )
      });
      this.getTodayOfferPrd('todayOfferProducts');
    }

    getTodayOfferPrd(offer_type) {
      
      this.productServices.getOfferProd('', offer_type).subscribe(
        products => {
          this.products = products
         },
        err => { if(err) console.log(err + " Something went wrong!!")},
        () =>{ }
      )
    }
    
    addtocart($event) {
      this.data.changeCart($event);
    }

}
