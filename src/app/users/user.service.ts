import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from './user';

@Injectable()

export class UserService {

    data = [];

    ngOnInit(): void {
        this.load();
    }
   constructor(private http:Http) { }

   save(user: User) {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    this.http.post("http://localhost:4000/users/", JSON.stringify(user), options)
    .subscribe(
        data => {
            console.log("ok, it works");
            });
    }

    load(){
        this.http.get("http://localhost:4000/users/")
        .subscribe()
    }
}