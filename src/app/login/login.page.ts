import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';

import { PostProvider } from '../../providers/post-provider';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private storage: Storage,
    private postProvider: PostProvider,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  async login() {
    if (this.username !== '' && this.password !== '') {
      const body = {
        action: 'login',
        username: this.username,
        password: this.password
      };

      this.postProvider.postData(body, 'process-api.php').subscribe(async data => {
        const alert = data.message;

        if (data.success) {
          this.storage.set('session_storage', data.result);
          this.userService.userLogin(data.id, this.username);
          this.router.navigate(['/']);
          await this.toastController.create({
            message: 'Welcome!',
            duration: 2000,
            color: 'primary'
          }).then(toast => toast.present());
          this.username = '';
          this.password = '';
        } else {
          await this.toastController.create({
            message: alert,
            duration: 2000,
            color: 'danger'
          }).then(toast => toast.present());
        }
      });
    } else {
      await this.toastController.create({
        message: 'Username or Password Incorrect!',
        duration: 2000,
        color: 'danger'
      }).then(toast => toast.present());
    }
  }

  register() {
    this.router.navigate(['/register']);
  }

}
