import { Injectable } from "@angular/core";
import { Http }       from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductSerivces {
    constructor(private http: Http){}
    private apiRoot = '/api/';
    private product_url = '/api/products';
    getProducts() {
        return this.http.get(this.product_url).map(result => result.json());
    }
    getOfferProd(cat, offertype) {
        return this.http.get(this.apiRoot +  '/' + offertype + '/' + cat ).map(res=>res.json());
    }
    getCatProducts(cat) {
        return this.http.get(this.product_url +  '/' + cat ).map(res=>res.json());
    }
    getProduct(id) {
        return this.http.get('/api/product' +  '/' + id ).map(res=>res.json());
    }
}

@Injectable()
export class UserService {
    constructor(private http: Http){}
    private _url = '/api/user';
    getUsers() {
        return this.http.get(this._url).map(result => result.json());
    }
    getUser(id) {
        return this.http.get(this._url + "/" + id).map(result => result.json());
    }
    postUser(user) {
        return this.http.post(this._url, user)
        .map(res=>res.json());
    }
}