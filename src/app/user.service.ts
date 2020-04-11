import { Injectable } from '@angular/core';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = new User(null, null, 'guest');

  constructor() { }

  userLogin(id, username) {
    this.user = new User(true, id, username);
  }

  userLogout() {
    if (this.isUserLoggedIn()) {
      this.user.loggedIn = false;
      this.user.id = null;
      this.user.username = 'guest';
    }
  }

  isUserLoggedIn() {
    return this.user.loggedIn;
  }

  getUser() {
    return this.user;
  }

  getUsername() {
    return this.user.username;
  }
}
