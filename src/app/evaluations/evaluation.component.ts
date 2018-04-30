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
  

  constructor(private evaluationService: EvaluationService){}

  ngOnInit() {  }

  // loadEnviroments() {
  //   this.enviromentService.load()
  //   .subscribe(enviroments => {
  //       this.enviroments = enviroments;
  //   });
  // }

  // loadUsers() {
  //   this.userService.load()
  //   .subscribe(users => {
  //     this.users = users;
  //   })
  // }

  save(evaluation) {
    evaluation.status = "NÃO INICIADA";
    this.evaluationService.save(evaluation)
    .subscribe(res => {
      console.log('res', res)
    }) 
  }
}