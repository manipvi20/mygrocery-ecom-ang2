import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Login } from './interfaces';
import {Http} from "@angular/http";

import { DataService } from "./share-service";

import { CustomValidators } from './validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  title:string = 'Login';
  breadcums: string = 'login';
  loggedIn = false;
  userDetails = <any>{};
  user = new Login();
  form:FormGroup;


  email:string;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private data: DataService,
    private http: Http
  ) { 
    this.form = _formBuilder.group({
      email: ['', CustomValidators.emailValidation],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.data.currentUser.subscribe(user => this.loggedIn = user)
  }


  login() {
    this.http.get('user/'+ this.user.email)
            .subscribe(
                (user: any) => {
                    this.userDetails = user.json();
                },
                err => { if(err) console.log(err + " Something went wrong!!")},
                () => {
                let userDetails = this.userDetails;
                if(userDetails == null)
                  return alert("username doesn't exit");

                if(userDetails.email == this.user.email && userDetails.password == this.user.password) {
                  this.loggedIn = !this.loggedIn;
                  let localStorageVal = localStorage.getItem('user');
                  localStorageVal !== null ? localStorage.removeItem('user') : '';
                  localStorage.setItem('user', userDetails.email);
                  this.data.changeUser(this.loggedIn);
                  this._router.navigate(['account']);
                }
                else {
                  alert("username or password is invalid");
                }
              }
          )
  }
}
