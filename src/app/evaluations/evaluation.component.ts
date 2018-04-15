import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Evaluation } from './evaluation';
import { EvaluationService} from './evaluation.service';
import { EnviromentService } from '../enviroments/enviroment.service';
import { Enviroment } from '../enviroments/enviroment';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html'
})

export class EvaluationComponent implements OnInit {


  evaluation: Evaluation = new Evaluation();
  evaluations: Evaluation[];
  enviroments: Enviroment[];

  constructor(private evaluationService : EvaluationService, private enviromentService : EnviromentService) 
  {

  }

  ngOnInit() {
    this.load();
    this.loadEnviroments();
  }

  load(){
    console.log('1');
  }

  loadEnviroments(){
    this.enviromentService.load()
    .subscribe(enviroments => {
        this.enviroments = enviroments;
    })
  }

  save(evaluation){
    alert('evaluation' + evaluation);
  }


}
