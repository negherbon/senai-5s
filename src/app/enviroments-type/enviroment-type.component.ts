import { Component, OnInit } from '@angular/core';
import { EnviromentTypeService } from './enviroment-type.service';
import { EnviromentType } from './enviroment-type';
import swal from 'sweetalert';

@Component({
  selector: 'app-enviroment-type', 
  templateUrl: './enviroment-type.component.html'
})

export class EnviromentTypeComponent implements OnInit {

  constructor(public enviromentTypeService : EnviromentTypeService) { }

  enviromentTypes: EnviromentType[]
  enviromentType: EnviromentType = new EnviromentType();

  ngOnInit() {
    this.load();
  }

  save(enviromentType): void {
    if(!enviromentType.id) {
      this.enviromentTypeService.save(enviromentType)
        .subscribe(res => {
          this.getValidation(res);
          this.load();
          this.enviromentType = new EnviromentType();  // reseta valores do formulário
      });
     } else {
      this.enviromentTypeService.update(enviromentType)
      .subscribe(res => {
        this.getValidation(res);
        this.load();
        this.enviromentType = new EnviromentType(); // reseta valores do formulário
      })
    }
  }

  getValidation(res) {
    swal({
      title: '',
      text: res['status'] === 201 ? 'Tipo de ambiente salvo com sucesso!' : 'Ocorreu um problema ao tentar salvar!',
      icon: 'success'
    });
  }

  load() {
    this.enviromentTypeService.load()
    .subscribe(
      enviromentsType => {
        this.enviromentTypes = enviromentsType
      },
      error => {
        console.log(error);
      },
    )
  }
  update(enviromentType: EnviromentType): void {
    this.enviromentType = enviromentType;
    window.scroll(0, 0);
  }

  /* NASS: Colocar icones e mensagens de acordo com retorno da api */
  remove(id: string): void {
    this.enviromentTypeService.remove(id)
    .subscribe((res) => {
      swal('', res['message'], 'success');
      this.load();
    });
  }

  getModalAnswer(enviromentsTypeId) {
    swal({
      title: 'Exclusão de tipo de ambiente',
      text: 'Tem certeza que deseja excluir o tipo de ambiente?',
      buttons: ['Cancelar', 'OK'],
      icon: 'warning',
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete)
        this.remove(enviromentsTypeId);
    });
  }
}