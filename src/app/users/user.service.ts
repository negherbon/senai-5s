import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from './user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable()

export class UserService implements OnInit {

   constructor(public http: HttpClient) {}

   ngOnInit(): void {
        this.load();
    }

    save(user: User) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.post(`${environment.apiUrl}`, user, httpOptions);
    }

    update(user: User) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.put(`${environment.apiUrl}/${user.id}`, user, httpOptions);
    }

    load(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}`);
    }

    remove(id) {
       return this.http.delete(`${environment.apiUrl}/${id}`);
    }
}
