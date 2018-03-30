import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnviromentType } from './enviroment-type';

@Injectable()

export class EnviromentTypeService {
    
    private url = "http://localhost:4000/enviromenttypes";

   constructor(public http: HttpClient) { }

    save(enviromentType: EnviromentType) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.post(`${this.url}`, enviromentType, httpOptions)
    }

    update(enviromentType: EnviromentType) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.put(`${this.url}/${enviromentType.id}`, enviromentType, httpOptions)
    }

    load(): Observable<EnviromentType[]> {
        return this.http.get<EnviromentType[]>(`${this.url}`);
    }

    remove(id){
       return this.http.delete(`${this.url}/${id}`);
    }
}