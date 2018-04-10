import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { Question } from './question';
import swal from 'sweetalert';
import { IOption } from 'ng-select';
import { EnviromentTypeService } from '../enviroments-type/enviroment-type.service';
import { EnviromentType } from '../enviroments-type/enviroment-type';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html'
})

export class QuestionComponent implements OnInit {

  constructor(public questionService: QuestionService, public enviromentTypeService : EnviromentTypeService) { }

  questions: Question[];
  enviromentTypes: EnviromentType[];
  question: Question = new Question();  
  myOptions: any[];

  ngOnInit() {
    this.load();
    this.loadEnviromentTypes();
  }


  load() {
    this.questionService.load()
      .subscribe(
        questions => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
          this.questions = questions;
          
        },
        error => {
          console.log(error)
        },
    )
  }

  loadEnviromentTypes(){
    this.enviromentTypeService.load()
    .subscribe(
      enviromentTypes => {
        this.enviromentTypes = enviromentTypes;
        this.myOptions = enviromentTypes.map(({id,name}) => ({label:name,value:id}));
      }
    )
  }

  save(question): void {

    var enviroments = [];

    enviroments.push(question.enviroment_types_id);

    if (!question.id) {
     this.questionService.save(question)
        .subscribe(res => {
          this.saveInAssociateTable(res["questionId"], enviroments);
          this.getValidation(res);
          this.load();
          this.question = new Question();  // reseta valores do formulário
        });
    } else {
      this.questionService.update(question)
        .subscribe(res => {
          this.getValidation(res);
          this.load();
          this.question = new Question(); // reseta valores do formulário
        })
    }
  }

  
  saveInAssociateTable(questionId, enviroments) : void{
    this.questionService.saveInAssociateTable(questionId, enviroments)
    .subscribe(res =>{
      console.log(res)
    })
}

  update(question: Question): void {
    this.question = question;
    window.scroll(0, 0);
  }

  remove(id: string): void {
    this.questionService.remove(id)
      .subscribe((res) => {
        swal("", res["message"], "success");
        this.load();
      });
  }

  getValidation(res) {
    swal({
      title: "",
      text: res["status"] === 201 ? 'Pergunta salva com sucesso!' : 'Ocorreu um problema ao tentar salvar!',
      icon: "success"
    });
  }

  getModalAnswer(questionId) {
    swal({
      title: "Exclusão de pergunta",
      text: "Tem certeza que deseja excluir a pergunta?",
      buttons: ["Cancelar", "OK"],
      icon: "warning",
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete)
          this.remove(questionId);
      });
  }
}
