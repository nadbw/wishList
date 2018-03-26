import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { ProductsProvider } from '../../providers/products/products';
import { Alert, AlertController } from 'ionic-angular';
import 'rxjs/Rx';
import { PreLoaderProvider } from '../../providers/pre-loader/pre-loader';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public products: any;
  public userStatus: boolean = false;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public platform: Platform, 
    public productsProvider: ProductsProvider, 
    public alrtCtrl: AlertController,
    public _LOADER: PreLoaderProvider) {
      console.log('HomePageContructed');
      
  }

  userIsLoggedIn(): boolean {
    console.log('userIsLoggedIn ' + this.userStatus)
    return this.userStatus;
  }

  goToProfile(): void {
    this.navCtrl.push('ProfilePage')
  }

  goToLogin(): void {
    this.navCtrl.push('LoginPage')
  }

  goToCreate(): void {
    this.navCtrl.push('EventCreatePage');
  }

  goToList(): void {
    this.navCtrl.push('EventListPage');
  }

  goToAddProductPage(): void {
    this.navCtrl.push('AddProductsPage');
  }

  ionViewDidLoad() {
    console.log('HomePageDidLoad');
   this._LOADER.displayPreloade();
   this.platform.ready().then(() => {
     this.loadAndParseProducts();
   })
  }

  loadAndParseProducts() {
    this.products = this.productsProvider.renderProducts();
    this._LOADER.hidePreloader();
  }

  addToWishList(productId: string): void {
    this.navCtrl.push('WishListPage', { isComingFromProfile: false, productId: productId });
  }

}
