import { Component, ViewChild, Input, OnInit, OnChanges } from '@angular/core';
import { Modal } from 'ng2-modal';

@Component({
    selector: 'modal-wrapper',
    templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
    @Input('cart') cart;
    @ViewChild(Modal) mymodel : Modal;
    @Input('grandTotal') grandTotal : number;
    constructor(){
    }
    ngOnChanges() {
        
    }
    ngOnInit() {
        var availcartItems = localStorage.getItem('cart');
        if(availcartItems != null) {
            this.cart = JSON.parse(availcartItems);
            for(let key of this.cart) {
                var prodPrice = key.discount ? key.discount : key.price;
                var prodTotal = key.qty * prodPrice;
                this.grandTotal += prodTotal;
            }
        }
        
    }
    open() {
        this.mymodel.open();
    }
}