import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { Question } from './question';
import swal from 'sweetalert';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html'
})

export class QuestionComponent implements OnInit {

  constructor(public questionService: QuestionService) { }

  questions: Question[];
  question: Question = new Question();

  ngOnInit() {
    this.load();
  }

  save(question): void {
    if (!question.id) {
      this.questionService.save(question)
        .subscribe(res => {
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

  getValidation(res) {
    swal({
      title: "",
      text: res["status"] === 201 ? 'Pergunta salva com sucesso!' : 'Ocorreu um problema ao tentar salvar!',
      icon: "success"
    });
  }

  load() {
    this.questionService.load()
      .subscribe(
        questions => {
          this.questions = questions
        },
        error => {
          console.log(error)
        },
    )
  }

  update(question: Question): void {
    this.question = question;
    window.scroll(0, 0);
  }

  /* NASS: Colocar icones e mensagens de acordo com retorno da api */
  remove(id: string): void {
    this.questionService.remove(id)
      .subscribe((res) => {
        swal("", res["message"], "success");
        this.load();
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
