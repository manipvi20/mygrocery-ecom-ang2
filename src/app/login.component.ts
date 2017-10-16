import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from './app.services';
import { Login } from './interfaces';

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
    private userserive : UserService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private data: DataService
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
    
    this.userserive.getUser(this.user.email).subscribe(
      res => { 
        this.userDetails = res 
      },
      err => { console.log(err + "couldnot process")
      },
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
        this._router.navigate(['']);
      }
      else {
        alert("username or password is invalid");
      }
    }
    );
  }
}
