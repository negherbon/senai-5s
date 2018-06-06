import { Component, OnInit, ViewChild } from '@angular/core';
import { Evaluation } from './evaluation';
import { EvaluationService} from './evaluation.service';
import { EnviromentService } from '../enviroments/enviroment.service';
import { Enviroment } from '../enviroments/enviroment';
import { User } from '../users/user';
import { UserService } from '../users/user.service';
import * as moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { defineLocale, PageChangedEvent } from 'ngx-bootstrap';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import swal from 'sweetalert';
import { NgForm } from '@angular/forms';

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

//Filter and pagination
  evaluationFiltered: Evaluation[];
  lengthEvaluationsPagination: number;
  @ViewChild('evaluationForm') evaluationForm : NgForm;

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

  findEvaluations(typed: string){
    this.evaluationFiltered = this.evaluations.filter(
        evaluation => evaluation.title.toLowerCase().includes(typed.toLowerCase()));
    this.lengthEvaluationsPagination = this.evaluationFiltered.length
  }

  load() {
    this.evaluationService.load()
    .subscribe(
      evaluations => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        this.evaluations = evaluations;
        this.evaluationFiltered = this.evaluations.slice(0, 10);
        this.lengthEvaluationsPagination = this.evaluations.length;
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

    evaluation.createDate = this.period[0];
    evaluation.dueDate = this.period[1];
    if(!evaluation.id){
      if(evaluation.dueDate.getTime() >= new Date().setHours(0,0,0,0)){
        evaluation.status = "PENDENTE";
      } else{
        evaluation.status = "ATRASADA";
      }
      this.evaluationService.save(evaluation)
      .subscribe(res => {
        this.getValidation(res);
        this.load();
      }) 
    } else {
      if(evaluation.status != "CONCLUIDA"){   
        if(evaluation.dueDate.getTime() >= new Date().setHours(0,0,0,0)){
          evaluation.status = "PENDENTE";
        } else{
          evaluation.status = "ATRASADA";
        }
      }
      this.evaluationService.update(evaluation)
      .subscribe(res => {
        this.getValidation(res);
        this.load();
      })
    }
  }

  update(evaluation: Evaluation): void {
    if(evaluation.status != "CONCLUIDA"){   
      moment.locale('pt-BR');
      this.period = [moment(evaluation.createDate).toDate(), moment(evaluation.dueDate).toDate()];
      this.evaluation = evaluation;
      window.scroll(0, 0);
    }
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

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.evaluationFiltered = this.evaluations.slice(startItem, endItem);
  }

  remove(id: number): void {
    this.evaluationService.remove(id)
    .subscribe((res) => {
      swal('', res['message'], 'success');
      this.load();
      this.evaluationForm.reset();
    });
  }
}