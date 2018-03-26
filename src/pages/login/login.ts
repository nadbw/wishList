import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Alert, AlertController, Loading, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public loading: Loading;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public loadCtrl: LoadingController,
      public alrtCtrl: AlertController,
      public authProvider: AuthProvider,
      formBuilder: FormBuilder) {

      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });
  }

  goToSignup(): void {
    this.navCtrl.push('SignupPage');
  }

  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }

  loginUser(): void {
    if(!this.loginForm.valid) {
      console.log('Form is not Valid Yet, current Value: ${this.loginForm.value}');
    }

    else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authProvider.loginUser(email, password).then(authData => {this.loading.dismiss().then(() => {this.navCtrl.setRoot(HomePage);});
      }, 
      error => {
        this.loading.dismiss().then(() => {const alert: Alert = this.alrtCtrl.create({
          message: error.message,
          buttons: [{text: 'OK', role: 'cancel'}]
        });
        alert.present();
      });
      });
      this.loading = this.loadCtrl.create();
      this.loading.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    

  }

}
