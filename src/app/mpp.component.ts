import { Component, OnInit } from '@angular/core';
import { ProductSerivces } from "./app.services";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'mpp',
  templateUrl: './mpp.component.html',
  styleUrls: ['./mpp.component.css']
})
export class MppComponent implements OnInit {
    title:string = 'MPP';
    breadcums: string = 'mpp';
    products: any[] = [];
    constructor(
        private productServices: ProductSerivces,
        private activatedRoute: ActivatedRoute
    ) {  }
    ngOnInit() {
        var cat = this.activatedRoute.params.subscribe(params => {
            var cat = params['catagory'];

            if(!cat)
                return
            
            this.productServices.getCatProducts(cat).subscribe(
                products => {
                    this.products = products
                    },
                err => { if(err) console.log(err + " Something went wrong!!")},
                () =>{ }
            )
        })
    }

}
