import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  
  url: string;

  constructor(public http: HttpClient) {
    this.url = `${environment.apiUrl}/util`;
  }

  loadById(id) {
    return this.http.get(`${this.url}/${id}`)
  }
}
