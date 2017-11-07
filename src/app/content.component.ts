import { Component, OnInit } from '@angular/core';
import { DataService } from "./share-service";
import {Http} from "@angular/http";

@Component({
  selector: 'content-container',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ConentComponent implements OnInit {
  products:any = [];
  snacksProd:any = [];
  fruitsProd: any = [];
  kitchenProd: any = [];
  otherProd: any = [];

  isLoading = true;

  tabCats:any = ['snacks', 'fruitsAndVeg', 'kitchen', 'others'];
  constructor( private data: DataService, private http: Http) {  }
  ngOnInit() {
    this.getallproducts();
    this.getSnacksPrd(this.tabCats[0], 'specialOfferProducts');
    this.getFruitsPrd(this.tabCats[1], 'specialOfferProducts');
    this.getKitchenPrd(this.tabCats[2], 'specialOfferProducts');
    this.getOtherPrd(this.tabCats[3], 'specialOfferProducts');
    this.getTodayOfferPrd('todayOfferProducts');
    
  }
  getallproducts() {
    this.http.get('products')
        .subscribe(
            (prod: any) => {
                this.products = prod.json();
            },
            err => { if(err) console.log(err + " Something went wrong!!")},
            () =>{ }
        ) 
    }

  getSnacksPrd(cat, offer_type) {
    this.http.get(offer_type + '/' + cat)
        .subscribe(
            (prod: any) => {
                this.snacksProd = prod.json();
                this.isLoading = false;
            },
            err => { if(err) console.log(err + " Something went wrong!!")},
            () =>{ }
          ) 
 }

  getFruitsPrd(cat, offer_type) {
    this.http.get(offer_type + '/' + cat)
        .subscribe(
            (prod: any) => {
                this.fruitsProd = prod.json();
            },
            err => { if(err) console.log(err + " Something went wrong!!")},
            () =>{ }
      )
  }

  getKitchenPrd(cat, offer_type) {
    this.http.get(offer_type + '/' + cat)
        .subscribe(
            (prod: any) => {
                this.kitchenProd = prod.json();
            },
            err => { if(err) console.log(err + " Something went wrong!!")},
            () =>{ }
          )
  }

  getOtherPrd(cat, offer_type) {
    this.http.get(offer_type + '/' + cat)
        .subscribe(
            (prod: any) => {
                this.otherProd = prod.json();
                
            },
            err => { if(err) console.log(err + " Something went wrong!!")},
            () =>{ }
          )
  }

  getTodayOfferPrd(offer_type) {
    this.http.get(offer_type)
        .subscribe(
            (prod: any) => {
                this.otherProd = prod.json();
            },
            err => { if(err) console.log(err + " Something went wrong!!")},
            () =>{ }
          )
  }
  addtocart($event) {
    this.data.changeCart($event);
  }

}
