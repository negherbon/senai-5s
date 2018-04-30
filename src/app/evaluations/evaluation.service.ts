import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Evaluation } from './evaluation';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()

export class EvaluationService implements OnInit {

   private url = 'http://localhost:4000/evaluations';

   constructor(public http: HttpClient) { }

    ngOnInit(): void {}

    save(evaluation: Evaluation) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.post(`${this.url}`, evaluation);
    }
}
