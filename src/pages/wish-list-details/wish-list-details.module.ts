import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WishListDetailsPage } from './wish-list-details';

@NgModule({
  declarations: [
    WishListDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(WishListDetailsPage),
  ],
})
export class WishListDetailsPageModule {}
