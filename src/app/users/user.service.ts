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

   private url = "http://localhost:4000/users";

   constructor(public http: HttpClient) { }

   ngOnInit(): void {
        this.load();
    }
  
    save(user: User) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.post(`${this.url}`, user, httpOptions)
    }

    update(user: User) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.put(`${this.url}/${user.id}`, user, httpOptions)
    }

    load(): Observable<User[]> {
        return this.http.get<User[]>(`${this.url}`);
    }

    remove(id){
       return this.http.delete(`${this.url}/${id}`);
    }
}
