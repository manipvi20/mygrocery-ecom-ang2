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
      this.cartqty = this.cart.length;
    }
    this.data.availCart.subscribe(c => {
      if(c != '') {
        this.cartqty += 1;
        this.cart.push(c);
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    }
    );

  }
  logout() {
    this.loggedIn = !this.loggedIn;
    this.data.changeUser(this.loggedIn);
    localStorage.removeItem('user');
  }
}
