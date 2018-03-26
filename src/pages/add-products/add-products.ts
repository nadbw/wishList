import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';

/**
 * Generated class for the AddProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-products',
  templateUrl: 'add-products.html',
})
export class AddProductsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public productsProvider: ProductsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductsPage');

  }

  addProduct(productName: string, productDesc: string, productCost: number): void {
    this.productsProvider.createProduct(productName, productDesc, productCost).then(newProduct => {
      this.navCtrl.pop();
    })
  }

}
