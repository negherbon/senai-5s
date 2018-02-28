import { Component, OnInit } from '@angular/core';
declare const $: any;
declare var Morris: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  save() {
    $.ajax({
      method: 'post',
      data: "user",
      url: 'http://localhost:4000/users'
    })
  }
}
