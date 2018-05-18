import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Evaluation } from './evaluation';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable()

export class EvaluationService implements OnInit {

   constructor(public http: HttpClient) { }

    ngOnInit(): void {}

    save(evaluation: Evaluation) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.post(`${environment.apiUrl}`, evaluation);
    }

    update(evaluation: Evaluation) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.put(`${environment.apiUrl}/${evaluation.id}`, evaluation, httpOptions);
    }

    load(): Observable<any> {
        return this.http.get(`${environment.apiUrl}`).map((response: Response) => {
            return response;
        });
    }

    remove(id) {
       return this.http.delete(`${environment.apiUrl}/${id}`);
    }
}
