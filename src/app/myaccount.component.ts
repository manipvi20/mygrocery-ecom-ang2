import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Http, URLSearchParams} from "@angular/http";

@Component({
  selector: 'my-account',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyAccountComponent implements OnInit {
  constructor(private http: Http, private router: Router) {  }
  user: any = {};
  defaultShipAddress:any = {};
  otherAddress :any[]= [];
  title : string = "My Account";
  userId: any;
  isLoading = true;
  ngOnInit() {
      this.userId = localStorage.getItem('user');
	  if(!this.userId)
		this.router.navigate(['/login']);
	  else
        this.userAddress();
  }
  userAddress() {
      this.http.get('user/'+ this.userId)
            .subscribe(
                (u: any) => {
                    this.user = u.json();
                    this.isLoading = false;
                    
                    var userShippAddresses = this.user.shipping_address
                    for(let key of userShippAddresses) {

                        if(key.defaultAddress === true)
                            this.defaultShipAddress = key;
                        else 
                            this.otherAddress.push(key);           
                    }
                },
                err => { if(err) console.log(err + " Something went wrong!!")},
                () =>{
                 }
            )
  }
  makeDefalut(address) {
    var addressId = address.address_id;
    for (let key of this.user.shipping_address) {
        if(key.address_id == addressId) {
            key.defaultAddress = true;
        }
        else {
             key.defaultAddress = false;
        }
    }

    let params: URLSearchParams = new URLSearchParams();
    params.set('address_id', addressId);

    this.http.put(
        'modifyUser/'+ this.user._id, 
        JSON.stringify(this.user), 
        {'search': params})
            .subscribe(res=> {
                this.otherAddress = [];
                this.userAddress();
            },
            err=>{},
            ()=>{console.log("")});
  }
}
