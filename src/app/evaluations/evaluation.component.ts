import { Component, OnInit } from '@angular/core';
import { Evaluation } from './evaluation';
import { EvaluationService} from './evaluation.service';
import { EnviromentService } from '../enviroments/enviroment.service';
import { Enviroment } from '../enviroments/enviroment';
import { User } from '../users/user';
import { UserService } from '../users/user.service';
import * as moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import swal from 'sweetalert';


@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html'
})

export class EvaluationComponent implements OnInit {
  evaluation: Evaluation = new Evaluation();
  evaluations: Evaluation[];
  users: User[];
  enviroments: Enviroment[];
  period: Date[];

  
  constructor(private evaluationService: EvaluationService,
    private userService: UserService,
    private enviromentService: EnviromentService){
      moment.locale('pt-BR');
      defineLocale('pt-br', ptBrLocale);
    }
    
    ngOnInit() {
    moment.locale('pt-br');
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
    if(!evaluation.id){
      evaluation.createDate = this.period[0];
      evaluation.dueDate = this.period[1];
      evaluation.status = "NÃO INICIADA";
      this.evaluationService.save(evaluation)
      .subscribe(res => {
        this.getValidation(res);
        this.load();
      }) 
    } else {
      evaluation.createDate = this.period[0];
      evaluation.dueDate = this.period[1];
      this.evaluationService.update(evaluation)
      .subscribe(res => {
        this.getValidation(res);
        this.load();
      })
    }
  }

  update(evaluation: Evaluation): void {
    moment.locale('pt-BR');
    this.period = [moment(evaluation.createDate).toDate(), moment(evaluation.dueDate).toDate()];
    this.evaluation = evaluation;
    window.scroll(0, 0);
  }

  getValidation(res) {
    swal({
      title: '',
      text: res['status'] === 201 ? 'Avaliação salva com sucesso!' : 'Ocorreu um problema ao tentar salvar!',
      icon: 'success'
    });
  }

  getModalAnswer(evaluationId) {
    swal({
      title: 'Exclusão de avaliação',
      text:  'Tem certeza que deseja excluir a avaliação?',
      buttons: ['Cancelar', 'OK'],
      icon: 'warning',
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete)
        this.remove(evaluationId);
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