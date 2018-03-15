import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { User } from './user';
import swal from 'sweetalert';

@Component({
   selector: 'app-user',
   templateUrl: './user.component.html',
   styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit{

  user: User = new User();
  users: User[];
  resposta: boolean;

  constructor(private userService: UserService) {
  }
  
  ngOnInit(): void {
    this.load();
  }

  save(user): void {
    this.userService.save(user)
    .subscribe(response => {
      this.load();
    });
  }

  load(){
    this.userService.load()
    .subscribe(users => this.users = users);
  }

  remove(id: string): void {
    this.userService.remove(id)
    .subscribe(() => {
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
      if (willDelete) {
        swal("Usuário excluído com sucesso!", {
          icon: "success",
        });
        this.remove(userId);
      } 
    });
  }
}
    