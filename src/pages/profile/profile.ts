import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Alert, AlertController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { ProductsProvider } from '../../providers/products/products';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public userProfile: any;
  public DOB: any;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public alrtCtrl: AlertController,
      public authProvider: AuthProvider, 
      public profileProvider: ProfileProvider,
      public productsProvider: ProductsProvider) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      this.DOB = userProfileSnapshot.val().birthDate;
    });
  }

  logOut():void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('LoginPage');
    })
  }

  updateBio(): void {
    const alert: Alert = this.alrtCtrl.create({
      message: "Enter your Bio here",
      inputs: [{
        name: 'bio',
        value: this.userProfile.bio
      }],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateBio(data); //Could also be data.bio
          }
        }
      ]
    });
    alert.present();
  }

  updateName(): void {
    const alert: Alert = this.alrtCtrl.create({
      message: "Your first name & last name",
      inputs: [{
        name: "firstName",
        placeholder: "Your First name here",
        value: this.userProfile.firstName
      },
      {
        name: "lastName",
        placeholder: "Your Last name here",
        value: this.userProfile.lastName
      }
    ],
    buttons: [
      { text: "Cancel" },
      { 
        text: "Save",
        handler: data => {
          this.profileProvider.updateName(data.firstName, data.lastName);
        }
      }
    ]
    });
    alert.present();
  }

  updateDOB(birthDate: string):void {
    this.profileProvider.updateDOB(birthDate);
  }

  updateEmail():void {
    let alert: Alert = this.alrtCtrl.create({
      inputs: [
        { name: "newEmail", placeholder: 'Your new Email'},
        { name: 'password', placeholder: 'Your Password', type: 'password' }
    ],
    buttons: [
      { text: 'Cancel' },
      { text: 'Save', 
        handler: data => {
          this.profileProvider.updateEmail(data.newEmail, data.password).then(() => { console.log('Email Changed Successfully'); 
        })
        .catch(error => { console.log('ERROR: ' + error.message);
      });
    }}]
    });
    alert.present();
  }

  updatePassword():void {
    let alert: Alert = this.alrtCtrl.create({
      inputs: [
        { name: 'newPassword', placeholder: 'New Password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Old Password', type: 'password' }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updatePassword(data.newPassword, data.oldPassword);
          }
        }
      ]
    });
    alert.present();
  }

  createAWishlist(): void {
    let alert: Alert = this.alrtCtrl.create({
      inputs: [
        { name: "wishListName", placeholder: "Name Your Wishlist", type: "text" }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.productsProvider.createAWishlist(data)
            }
        }
      ]
    });
    alert.present();
  }


  getMyLists(): void {
    this.navCtrl.push('WishListPage', { isComingFromProfile: true, productId: null });
  }

}
