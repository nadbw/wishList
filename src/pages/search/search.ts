import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  public userList:Array<any>;
  public loadeduserList:Array<any>;
  public userRef:firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  this.userRef = firebase.database().ref('/users');
  this.userRef.on('value', userList => {
    let users = [];
    userList.forEach( user => {
      users.push(user.val());
      return false;
    });
  
    this.userList = users;
    this.loadeduserList = users;
    
  });

}


initializeItems(){
  this.userList = this.loadeduserList;
}

getItems(searchbar) {
  this.initializeItems();

  var q = searchbar.srcElement.value;

  if (!q) {
    return;
  }

  this.userList = this.userList.filter((v) => {
    if(v.name && q) {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });

  console.log(q, this.countryList.length);





  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
