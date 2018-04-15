import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Evaluation } from './evaluation';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()

export class EvaluationService {

   private url = "http://localhost:4000/evaluations";

   constructor(public http: HttpClient) { }

   ngOnInit(): void {
        this.load();
    }
  
    save(evaluation: Evaluation) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.post(`${this.url}`, evaluation, httpOptions)
    }

    // update(enviroment: Evaluation) {
    //     const httpOptions = {
    //         headers: new HttpHeaders({
    //             'Content-Type':  'application/json'
    //         })
    //     };
    //   return this.http.put(`${this.url}/${enviroment.id}`, enviroment, httpOptions)
    // }

    load(): Observable<Evaluation[]> {
        return this.http.get<Evaluation[]>(`${this.url}`);
    }

    // remove(id){
    //    return this.http.delete(`${this.url}/${id}`);
    // }
}
