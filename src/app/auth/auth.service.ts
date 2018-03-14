import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AuthService {

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  usuarioEstaAutenticado(){
      debugger;
     var token = localStorage.getItem('token');
     if(token)  
        this.usuarioAutenticado = true;
  }

}