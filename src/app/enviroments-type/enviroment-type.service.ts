import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnviromentType } from './enviroment-type';
import { environment } from '../../environments/environment.prod';

@Injectable()

export class EnviromentTypeService {

   constructor(public http: HttpClient) { }

    save(enviromentType: EnviromentType) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.post(`${environment.apiUrl}`, enviromentType, httpOptions);
    }

    update(enviromentType: EnviromentType) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.put(`${environment.apiUrl}/${enviromentType.id}`, enviromentType, httpOptions);
    }

    load(): Observable<EnviromentType[]> {
        return this.http.get<EnviromentType[]>(`${environment.apiUrl}`);
    }

    remove(id) {
       return this.http.delete(`${environment.apiUrl}/${id}`);
    }
}
