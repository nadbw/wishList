import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { ProfileProvider } from '../providers/profile/profile';
import { Camera } from '@ionic-native/camera';
import { ProductsProvider } from '../providers/products/products';
import { ImageProvider } from '../providers/image/image';
import { PreLoaderProvider } from '../providers/pre-loader/pre-loader';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    HttpClientModule,
    HttpModule,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ProfileProvider,
    Camera,
    ProductsProvider,
    ImageProvider,
    PreLoaderProvider
  ]
})
export class AppModule {}
