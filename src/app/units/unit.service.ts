import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Unit } from './unit';
import { environment } from '../../environments/environment.prod';

@Injectable()

export class UnitService {

    private url = 'http://localhost:4000/units';

   constructor(public http: HttpClient) { }

    getStates() {
        return this.http.get('https://br-cidade-estado-nodejs.glitch.me/estados/');
    }

    getCities(stateId) {
        return this.http.get(`https://br-cidade-estado-nodejs.glitch.me/estados/${stateId}/cidades?`);
    }

    save(unit: Unit) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.post(`${environment.apiUrl}`, unit, httpOptions);
    }

    update(unit: Unit) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
      return this.http.put(`${environment.apiUrl}/${unit.id}`, unit, httpOptions);
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
