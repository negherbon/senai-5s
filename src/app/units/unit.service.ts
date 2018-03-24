import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Unit } from './unit';

@Injectable()

export class UnitService {
    
    private url = "http://localhost:4000/units";

   constructor(public http: HttpClient) { }

    getStates(){
        return this.http.get("https://br-cidade-estado-nodejs.glitch.me/estados/");
    }

    getCities(stateId){
        return this.http.get(`https://br-cidade-estado-nodejs.glitch.me/estados/${stateId}/cidades?`);
    }
    
    save(unit: Unit) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.post(`${this.url}`, unit, httpOptions)
    }

    update(unit: Unit) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.put(`${this.url}/${unit.id}`, unit, httpOptions)
    }

    load(): Observable<Unit[]> {
        return this.http.get<Unit[]>(`${this.url}`);
    }

    remove(id){
       return this.http.delete(`${this.url}/${id}`);
    }
}