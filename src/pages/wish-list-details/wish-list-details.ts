import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';

/**
 * Generated class for the WishListDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wish-list-details',
  templateUrl: 'wish-list-details.html',
})
export class WishListDetailsPage {

  public wishlistId: any;
  public wishListItems: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public productProvider: ProductsProvider) {

      this.wishlistId = this.navParams.get('wishlistId')
      console.log('wishlistId: ' + this.wishlistId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishListDetailsPage');

    this.productProvider.getWishListDetails(this.wishlistId).on('value', allWishProductsSnap => {
      this.wishListItems = [];
      allWishProductsSnap.forEach(wishlistItem => {
        console.log('wishListItem id ' + wishlistItem.val().id)
        this.productProvider.getProductDetails(wishlistItem.val().id).on('value', product => {
          console.log('product details' + product.val().name)
          this.wishListItems.push({
            id: product.key,
            name: product.val().name,
            desc: product.val().prodDesc,
            cost: product.val().price
          });
        })
        return false;
      })
    })

    

  }

}
