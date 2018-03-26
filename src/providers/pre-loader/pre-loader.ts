import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

/*
  Generated class for the PreLoaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PreLoaderProvider {

  private loading: any;

  constructor(public http: HttpClient, public loadingCtrl: LoadingController) {
    console.log('Hello PreLoaderProvider Provider');
  }

  displayPreloade(): void {
    this.loading =  this.loadingCtrl.create({
      content: 'Please Wait...'
    });

    this.loading.present();
  }

  hidePreloader(): void {
    this.loading.dismiss();
  }

}
