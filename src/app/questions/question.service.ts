import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Question } from './question';
import { environment } from '../../environments/environment.prod';


@Injectable()

export class QuestionService {

   constructor(public http: HttpClient) { }

    save(question: Question) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.post(`${environment.apiUrl}`, question, httpOptions);
    }

    saveInAssociateTable(questionId, enviromentTypeId) {
        let relatedIds = {
            questionId: questionId,
            enviromentTypeId: enviromentTypeId
        };

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };

      return this.http.post(`${environment.apiUrl}`, relatedIds, httpOptions);
    }

    getAssociatedItems(questionId): Observable<any> {
        return this.http.get(`${environment.apiUrl}/${questionId}`).map((response: Response) => {
            return response;
        });
    }

    removeAssociatedItems(questionId){
        return this.http.delete(`${environment.apiUrl}/${questionId}`);
    }

    update(question: Question) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.put(`${environment.apiUrl}/${question.id}`, question, httpOptions);
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
