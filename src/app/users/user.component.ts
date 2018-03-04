import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from './user.service';
import { User } from './user';

@Component({
   selector: 'app-user',
   templateUrl: './user.component.html',
   styleUrls: ['./user.component.css']
})

export class UserComponent {

  user: User = new User();
  constructor(private userService: UserService) {
  }

  save(user) {
    this.userService.save(user);
  }
}
    