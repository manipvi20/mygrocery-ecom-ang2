import { Component, OnInit } from '@angular/core';
import { DataService } from "./share-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn:boolean;
  cart=[];
  cartqty = 0;
  splicedCart = [];
  grandTotal: number = 0;
  constructor(private data: DataService) {  }

  ngOnInit() {
    let localStorageVal = localStorage.getItem('user');
    if(localStorageVal == null) {
      this.data.currentUser.subscribe(user => this.loggedIn = user);
    }
    else {
      this.loggedIn = true;
      this.data.changeUser(this.loggedIn);
    }
    var availableCart = localStorage.getItem('cart');
    if(availableCart !== null) {
      this.cart = JSON.parse(availableCart);
      //this.cartqty = this.cart.length;
      var tempCart = this.cart;
      for(let key of tempCart) {
        this.cartqty =  this.cartqty + key.qty
      }
    }
    this.data.availCart.subscribe(c => {
      if(c != '') {
        this.cartqty += 1;
        c['qty'] = 1;
        for(let i = 0; i < this.cart.length; i++) {
          if(this.cart[i]['prod_id'] == c['prod_id'] ) {
            c['qty'] += 1;
          }
        }
        this.cart.push(c);
        var filteredCartItems = this.removeDuplicatesItems(this.cart, 'prod_id');
        localStorage.setItem('cart', JSON.stringify(filteredCartItems));
        this.splicedCart = filteredCartItems;
        for(let key of filteredCartItems) {
            var prodPrice = key.discount ? key.discount : key.price;
            var prodTotal = key.qty * prodPrice;
            this.grandTotal += prodTotal;
        }
        console.log(this.grandTotal)
      }
    }
    );
  }

  removeDuplicatesItems(cartItems, prop) {
    return cartItems.filter((obj, pos, arr) => {
      console.log(pos);
        return arr.map(
          function(newCart){
            return newCart[prop]
          }).indexOf(obj[prop]) === pos;
    });
  }

  logout() {
    this.loggedIn = !this.loggedIn;
    this.data.changeUser(this.loggedIn);
    localStorage.removeItem('user');
  }
}
