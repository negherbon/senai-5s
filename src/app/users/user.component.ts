import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { User } from './user';


@Component({
   selector: 'app-user',
   templateUrl: './user.component.html',
   styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit{

  user: User = new User();
  users: User[];
  constructor(private userService: UserService) {
  }
  
  ngOnInit(): void {
    this.load();
  }

  save(user) {
    this.userService.save(user);
  }

  load(){
    this.userService.load()
    .subscribe(users => this.users = users);
  }
}
    