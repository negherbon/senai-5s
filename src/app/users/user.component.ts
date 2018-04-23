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
    this.userSession = helper.decodeToken(localStorage.getItem('token'));
  }

  save(user): void {
    let isRegistered = this.users.find(currentUser => currentUser.email == user.email);

    if(isRegistered && isRegistered.id != user.id)
      this.showModal("Usuário não cadastrado", "Já existe um usuário com este e-mail");
    else {
      if(!user.id){
        this.userService.save(user)
          .subscribe(res => {
            this.getValidation(res);
            this.load();
            this.user = new User();  // reseta valores do formulário
        });
      } else {
        this.userService.update(user)
        .subscribe(res => {
          this.getValidation(res);
          this.load();
          this.user = new User(); // reseta valores do formulário
        })
      }
    }

  }
  load() {
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

  update(user: User): void {
    this.user = user;
    window.scroll(0, 0);
  }

  remove(id: string): void {
    this.userService.remove(id)
    .subscribe((res) => {
      swal('', res['message'], 'success');
      this.load();
    });
  }

  getValidation(res) {
    swal({
      title: '',
      text: res['status'] === 201 ? 'Usuário salvo com sucesso!' : 'Ocorreu um problema ao tentar salvar!',
      icon: 'success'
    } );
  }

  getModalAnswer(userId) {
    swal({
      title: 'Exclusão de usuário',
      text: 'Tem certeza que deseja excluir o usuário?',
      buttons: [null, 'OK'],
      icon: 'warning',
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.remove(userId);
      }
    });
  }

  showModal(title, text) {
    swal({
      title: title,
      text: text,
      buttons: [null ,"OK"],
      icon: "warning",
      dangerMode: true,
    })
  }
}
