import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from './user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()

export class UserService {

   constructor(private http: HttpClient) { }

   ngOnInit(): void {
        this.load();
    }
  
    save(user: User) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      this.http.post('http://localhost:4000/users/', user, httpOptions)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured');
        }
      );
    }

    load(): Observable<User[]> {
        return this.http.get<User[]>("http://localhost:4000/users/");
    }
}
