import { Component, OnInit } from '@angular/core';
import { Evaluation } from './evaluation';
import { EvaluationService} from './evaluation.service';
import { EnviromentService } from '../enviroments/enviroment.service';
import { Enviroment } from '../enviroments/enviroment';
import { User } from '../users/user';
import { UserService } from '../users/user.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html'
})

export class EvaluationComponent implements OnInit {
  evaluation: Evaluation = new Evaluation();
  evaluations: Evaluation[];
  users: User[];
  enviroments: Enviroment[];

  constructor(private evaluationService: EvaluationService,
              private userService: UserService,
              private enviromentService: EnviromentService){}

  ngOnInit() {
    this.loadEnviroments();
    this.loadUsers();
    this.load();
  }

  load() {
    this.evaluationService.load()
      .subscribe(
        evaluations => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
          this.evaluations = evaluations;
        },
        error => {
          console.log(error)
        },
    );
  }

  loadEnviroments() {
    this.enviromentService.load()
    .subscribe(enviroments => {
        this.enviroments = enviroments;
    });
  }

  loadUsers() {
    this.userService.load()
    .subscribe(users => {
      this.users = users;
    })
  }

  save(evaluation) {
    evaluation.createDate = evaluation.period[0];
    evaluation.dueDate = evaluation.period[1];
    evaluation.status = "NÃO INICIADA";
    this.evaluationService.save(evaluation)
    .subscribe(res => {
      console.log('res', res)
    }) 
  }

  getValidation(res) {
    swal({
      title: '',
      text: res['status'] === 201 ? 'Pergunta salva com sucesso!' : 'Ocorreu um problema ao tentar salvar!',
      icon: 'success'
    });
  }

  getModalAnswer(questionId) {
    swal({
      title: 'Exclusão de pergunta',
      text: 'Tem certeza que deseja excluir a pergunta?',
      buttons: ['Cancelar', 'OK'],
      icon: 'warning',
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete)
        this.remove(questionId);
    });
  }

  remove(id: number): void {
    this.evaluationService.remove(id)
    .subscribe((res) => {
      swal('', res['message'], 'success');
      this.load();
    });
  }
}