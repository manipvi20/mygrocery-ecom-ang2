import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import {Http} from "@angular/http";
import { RegisterUser } from './interfaces';
import { DataService } from "./share-service";
import { CustomValidators } from './validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    title:string = 'Register';
    breadcums: string = 'register';
    registeruser = new RegisterUser();
    form:FormGroup;
    loggedIn = false;

    constructor(
      private http : Http,
      private _formBuilder: FormBuilder,
      private _router: Router,
      private _activatedRoute: ActivatedRoute,
      private data: DataService) 
    { 
      this.form = _formBuilder.group({
        username: ['', Validators.required],
        email: ['', CustomValidators.emailValidation],
        password: ['', Validators.required],
        c_password: ['', Validators.required],
      });
    }
    ngOnInit() {
      let loggedInCheck = localStorage.getItem('user');
      if(loggedInCheck !== null) {
          this._router.navigate(['']);
      }
    }
    register() {
      this.validatePassword();
      if(this.form.valid == true) {
        var newObj = this.registeruser;
        delete newObj['c_password'];

        this.http.post('user', newObj)
            .subscribe(
                res=> {
                  this.loggedIn = !this.loggedIn;
                  localStorage.removeItem('user');
                  localStorage.setItem('user', this.registeruser.email);
                  this.data.changeUser(this.loggedIn);
                  this._router.navigate(['']);            
                },
                err=> {console.log (err + "Error");},
                ()=>{}
            )
      }
    
    }
    validatePassword() {
      if(this.registeruser.c_password !== "" && 
      this.registeruser.password !== '' && 
      (this.registeruser.password !== this.registeruser.c_password)){
        this.form.setErrors({
              passwordShouldMatch: true
          });
      }
      else {
          this.form.setErrors(null);
      }
    }
}
