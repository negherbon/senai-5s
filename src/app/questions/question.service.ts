import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Question } from './question';

@Injectable()

export class QuestionService {
    
    private url = "http://localhost:4000/questions";

   constructor(public http: HttpClient) { }
    
    save(question: Question) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.post(`${this.url}`, question, httpOptions)
    }

    update(question: Question) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.put(`${this.url}/${question.id}`, question, httpOptions)
    }

    load(): Observable<any> {
        return this.http.get(`${this.url}`).map((response: Response) => {
            return response;
        });
    }

    remove(id){
       return this.http.delete(`${this.url}/${id}`);
    }
}