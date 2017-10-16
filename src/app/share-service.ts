import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class DataService {
  private userSource = new BehaviorSubject<boolean>(false);
  currentUser = this.userSource.asObservable();

  private cart = new BehaviorSubject<any>('');
  availCart = this.cart.asObservable();

  constructor() { }
  changeUser(user: boolean) {
    this.userSource.next(user)
  }

  changeCart(c: any) {
    this.cart.next(c)
  }
}