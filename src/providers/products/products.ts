import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'rxjs/add/operator/map';
import { Reference, ThenableReference } from '@firebase/database-types';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ProductsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsProvider {

  public wishListRef: Reference;
  public productsRef: Reference;
  public wishListProductRef: Reference;
  public user: any;

  constructor(public http: HttpClient) {
    console.log('Hello ProductsProvider Provider');
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.user = user;
        this.wishListRef = firebase.database().ref(`/userProfile/${user.uid}/wishLists/`);
        this.productsRef = firebase.database().ref(`/products/`);
      }
    });
  }

  renderProducts(): Observable<any> {
    return new Observable(obser => {
      let products: any = [];
      firebase.database().ref(`/products/`).orderByKey().once('value', (productsSnapshot: any) => {
        productsSnapshot.forEach(product => {
          products.push({
            id: product.key,
            name: product.val().name,
            desc: product.val().prodDesc,
            cost: product.val().price
          });
        });
        obser.next(products);
        obser.complete();
      },
      (error) =>
         {
            console.log("Observer error: ", error);
            console.dir(error);
            obser.error(error)
         });
    });
  }

  createAWishlist(wishListName: string): ThenableReference {
    return this.wishListRef.push({
      name: wishListName
    });
  }

  getWishListDetails(wishListId: string): Reference {
    return this.wishListRef.child(`${wishListId}/products`)
  }

  addToWishList(wishListId: string, productId: string): ThenableReference {
    return this.wishListRef.child(`${wishListId}/products/`).push({ id: productId });
  }
  
  createProduct(productName: string, productDesc: string, productCost: number): ThenableReference {
    return this.productsRef.push({ 
      name: productName,
      prodDesc: productDesc,
      price: productCost
    })
  }

  getProductList(): Reference {
    return this.productsRef;
  }

  getAllWishLists(): Reference {
    return this.wishListRef;
  }  

  getProductDetails(productId: string): Reference {
    return this.productsRef.child(productId);
  }



}
