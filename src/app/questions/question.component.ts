import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from './question.service';
import { Question } from './question';
import swal from 'sweetalert';
import { IOption } from 'ng-select';
import { EnviromentTypeService } from '../enviroments-type/enviroment-type.service';
import { EnviromentType } from '../enviroments-type/enviroment-type';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html'
})

export class QuestionComponent implements OnInit {

  constructor(public questionService: QuestionService, public enviromentTypeService: EnviromentTypeService) { }

  questions: Question[];
  enviromentTypes: EnviromentType[];
  question: Question = new Question();
  selectItems: Array<IOption>;
  selectedEnviromentTypes: Array<String> = [];

  //Filter and pagination
  questionFiltered: Question[];
  lengthQuestionPagination: number;

    @ViewChild('questionForm') questionForm : NgForm;

  ngOnInit() {
    this.load();
    this.loadEnviromentTypes();
  }

  findQuestion(typed: string) {
    this.questionFiltered = this.questions.filter(
      question => question.title.toLowerCase().includes(typed.toLowerCase()));
    this.lengthQuestionPagination = this.questionFiltered.length;
  }

  /* REFATORAR */
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
        this.questionService.update(question)
        .subscribe(res => {
          this.questionService.removeAssociatedItems(question.id)
          .subscribe(res => {
            this.saveInAssociateTable(question.id, question['enviroment_types_id']);
          })
          this.getValidation(res);
          this.load();
          this.question = new Question();
        })
      }
    }

  load() {
    this.questionService.load()
      .subscribe(
        questions => {
          this.questions = questions;
          this.questionFiltered = this.questions.slice(0, 10);
          this.lengthQuestionPagination = this.questions.length;
        },
        error => {
          console.log(error)
        },
    );
  }

  loadEnviromentTypes() {
    this.enviromentTypeService.load()
      .subscribe(
        enviromentTypes => {
          this.enviromentTypes = enviromentTypes;
          this.selectItems = enviromentTypes.map(({ id, name }) => ({ label: name, value: id.toString() }));
        }
      );
  }

  saveInAssociateTable(questionId, enviromentTypeId): void {
    this.questionService.saveInAssociateTable(questionId, enviromentTypeId)
      .subscribe(res => { });
  }

  update(question: Question): void {
    this.questionService.getAssociatedItems(question.id)
      .subscribe(relatedItems => {
        const items = this.enviromentTypes.filter(enviroment => relatedItems.find(relatedItem => enviroment.id === relatedItem.enviroment_types_id));
        this.selectedEnviromentTypes = items.map(item => String(item.id));
      });

    this.question = question;
    window.scroll(0, 0);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.questionFiltered = this.questions.slice(startItem, endItem);
  }

  remove(id: string): void {
    this.questionService.removeAssociatedItems(id)
    .subscribe(res => {
      this.questionService.remove(id)
      .subscribe((res) => {
        this.getValidation(res);
        this.load();
        this.questionForm.reset();
      },
      error => {
        this.getValidation(error.error);
        this.load();
      })
    })
  }


  getValidation(res) {
    swal({
      title: '',
      text: res["message"],
      icon: res["type"]
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
