import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { PostProvider } from '../../providers/post-provider';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string;
  password: string;
  confirmPassword: string;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private postProvider: PostProvider
  ) { }

  ngOnInit() {
  }

  async register() {
    if (this.username === '') {
      await this.toastController.create({
        message: 'Username is required',
        duration: 2000
      }).then(toast => toast.present());
    } else if (this.password === '') {
      await this.toastController.create({
        message: 'Password is required',
        duration: 2000
      }).then(toast => toast.present());
    } else if (this.password !== this.confirmPassword) {
      await this.toastController.create({
        message: 'Invalid password',
        duration: 2000
      }).then(toast => toast.present());
    } else {
      const body = {
        action: 'register',
        username: this.username,
        password: this.password
      };

      this.postProvider.postData(body, 'process-api.php').subscribe(async data => {
        const alert = data.message;

        if (data.success) {
          this.router.navigate(['/login']);
          await this.toastController.create({
            message: 'Register Successful',
            duration: 2000
          }).then(toast => toast.present());
        } else {
          await this.toastController.create({
            message: alert,
            duration: 2000
          }).then(toast => toast.present());
        }
      });
    }
  }

  login() {
    this.router.navigate(['/login']);
  }


}
