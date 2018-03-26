import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';

/**
 * Generated class for the WishListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wish-list',
  templateUrl: 'wish-list.html',
})
export class WishListPage {

  public productId: any;
  public isComingFromProfile: any;
  public wishListArray: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public productProvider: ProductsProvider) {

    this.isComingFromProfile = this.navParams.get('isComingFromProfile')

    if(this.isComingFromProfile){
      this.productId = null;
    }
    else {
      this.productId = this.navParams.get('productId');
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishListPage');

    this.productProvider.getAllWishLists().on('value', allWishlistsSnapshot => {
      this.wishListArray = [];
      allWishlistsSnapshot.forEach(wishlist => {
        this.wishListArray.push({
          id: wishlist.key,
          name: wishlist.val().name.wishListName 
        });
        return false
      })
    })
  }

  addToWishlist(wishlistId: string): void {

    if(this.isComingFromProfile) {
      this.navCtrl.push('WishListDetailsPage', {wishlistId: wishlistId})
    }
    else {
      this.productProvider.addToWishList(wishlistId, this.productId).then(newItem => {
        this.navCtrl.pop();
      })
    }
  }


}
