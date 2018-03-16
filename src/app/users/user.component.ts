import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { User } from './user';
import swal from 'sweetalert';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Component({
   selector: 'app-user',
   templateUrl: './user.component.html',
   styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit{

  user: User = new User();
  users: User[];
  userSession: User = new User();
  
  constructor(private userService: UserService) {
  }
  
  ngOnInit(): void {
    this.load();
    this.userSession = helper.decodeToken(localStorage.getItem("token"));
  }

  /* NASS: Refatorar */
  save(user): void {
    this.userService.save(user)
    .subscribe(res => {
      swal({
        title: "",
        text: res["status"] === 201 ? 'Usuário salvo com sucesso!' : 'Ocorreu um problema ao tentar salvar!',
        icon: "success"
      });
      this.load();
    });
  }

  load(){
    this.userService.load()
    .subscribe(
      users => {
        this.users = users
      },
      error => {
        console.log(error)
      },
    )
  }

  /* NASS: Colocar icones e mensagens de acordo com retorno da api */
  remove(id: string): void {
    this.userService.remove(id)
    .subscribe((res) => {
      swal("", res["message"], "success");
      this.load();
    });
  }

  getModalAnswer(userId){
    swal({
      title: "Exclusão de usuário",
      text: "Tem certeza que deseja excluir o usuário?",
      buttons: ["Cancelar", "OK"],
      icon: "warning",
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete)
        this.remove(userId);
    });
  }
}
    