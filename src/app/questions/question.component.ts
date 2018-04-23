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

  constructor(public questionService: QuestionService, public enviromentTypeService: EnviromentTypeService) { }

  questions: Question[];
  enviromentTypes: EnviromentType[];
  question: Question = new Question();  
<<<<<<< HEAD
  selectItems: Array<IOption>;
  selectedEnviromentTypes: Array<String> = [];

=======
  myOptions: any[];
>>>>>>> d84bfad3ce5b44903d124936b49d8008b7607436
  ngOnInit() {

   this.load();
    this.loadEnviromentTypes();
  }
<<<<<<< HEAD

  //TODO: REFATORAR ESSA FUNÇÃO
  save(question): void {
    if (!question.id) {
        question['enviroment_types_id'] = this.selectedEnviromentTypes;
        this.questionService.save(question)
        .subscribe(res => {
          this.saveInAssociateTable(res['questions_id'], res['enviroment_types_id']);
          this.getValidation(res);
          this.load();
          this.question = new Question();  
        });
    } else {
      question['enviroment_types_id'] = this.selectedEnviromentTypes;
      this.questionService.removeAssociatedItems(question.id)
      .subscribe(res => {
        this.saveInAssociateTable(question.id, question["enviroment_types_id"]);
        this.getValidation(res);
        this.load();
        this.question = new Question(); 
      })
    }
  }

=======
>>>>>>> d84bfad3ce5b44903d124936b49d8008b7607436
  load() {
    this.questionService.load()
      .subscribe(
        questions => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
          this.questions = questions;
        },
        error => {
          console.log(error)
        },
    );
  }

  loadEnviromentTypes() {
<<<<<<< HEAD
    this.enviromentTypeService.load() 
    .subscribe(
      enviromentTypes => {
        this.enviromentTypes = enviromentTypes;
        this.selectItems = enviromentTypes.map(({id, name}) => ({label: name, value: id.toString()}));
      }
    );
=======
    this.enviromentTypeService.load()
    .subscribe(
      enviromentTypes => {
        this.enviromentTypes = enviromentTypes;
        this.myOptions = enviromentTypes.map(({id,name}) => ({label:name,value:id}));
        
      }
    )
  }

  save(question): void {
    if (!question.id) {
        this.questionService.save(question)
        .subscribe(res => {
          this.saveInAssociateTable(res['questions_id'], res['enviroment_types_id']);
          this.getValidation(res);
          this.load();
          this.question = new Question();  
        });
    } else {
      this.questionService.update(question)
        .subscribe(res => {
          this.getValidation(res);
          this.load();
          this.question = new Question(); 
      })
    }
>>>>>>> d84bfad3ce5b44903d124936b49d8008b7607436
  }
   
  saveInAssociateTable(questionId, enviromentTypeId): void {
    this.questionService.saveInAssociateTable(questionId, enviromentTypeId)
<<<<<<< HEAD
    .subscribe(res => {});
=======
    .subscribe(res => {

    })
>>>>>>> d84bfad3ce5b44903d124936b49d8008b7607436
  }
  
  update(question: Question): void {
    this.questionService.getAssociatedItems(question.id)
    .subscribe(relatedItems => {
<<<<<<< HEAD
      const items = this.enviromentTypes.filter(enviroment => relatedItems.find(relatedItem => enviroment.id === relatedItem.enviroment_types_id)); 
      this.selectedEnviromentTypes = items.map( item => String(item.id) );
    });

=======
      var items = this.enviromentTypes.filter(enviroment=>relatedItems.find(relatedItem=> enviroment.id === relatedItem.enviroment_types_id))
      this.myOptions = items.map(({id,name}) => ({label:name,value:id}))
    })
>>>>>>> d84bfad3ce5b44903d124936b49d8008b7607436
    this.question = question;
    window.scroll(0, 0);
  }

  remove(id: string): void {
    this.questionService.remove(id)
      .subscribe((res) => {
        swal('', res['message'], 'success');
        this.load();
      });
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
}
