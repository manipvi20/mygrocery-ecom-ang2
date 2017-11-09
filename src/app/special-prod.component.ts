import { Component, OnInit, Input } from '@angular/core';
import { cartitem } from './cart';
import { ActivatedRoute } from '@angular/router';

import { DataService } from "./share-service";

@Component({
  selector: 'special-products',
  templateUrl: './special-prod.component.html',
  styleUrls: ['./special-prod.component.css']
})
export class SpecialComponent implements OnInit {
    @Input('title') title:any;
    @Input('products') products:any[];
    items = [];
    constructor(
        private data: DataService,
        private activatedRoute : ActivatedRoute
    ) {  }
    
    ngOnInit() {
        this.data.availCart.subscribe(c => this.items = c);
        if(!this.title)
            this.activatedRoute.params.subscribe(p=> this.title = p )
    }
    
    addtocart($event) {
        this.data.changeCart($event);
    }
}

