import { Component, OnInit } from '@angular/core';
import { EnviromentTypeService } from './enviroment-type.service';
import { EnviromentType } from './enviroment-type';
import swal from 'sweetalert';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-enviroment-type',
  templateUrl: './enviroment-type.component.html'
})

export class EnviromentTypeComponent implements OnInit {

  constructor(public enviromentTypeService: EnviromentTypeService) { }

  enviromentTypes: EnviromentType[];
  enviromentType: EnviromentType = new EnviromentType();

    //Filter and pagination
    returnedArray: EnviromentType[];
    lengthEnvironmentTypePagination: number;

  ngOnInit() {
    this.load();
  }

  findEnvironmentTypes(typed: string){
    typed = typed.toLowerCase();
    this.returnedArray = this.enviromentTypes.filter(env => env.name.toLowerCase().includes(typed));
    this.lengthEnvironmentTypePagination = this.returnedArray.length;
  }

  save(enviromentType): void {
    if (!enviromentType.id) {
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
      });
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
        this.enviromentTypes = enviromentsType;
        this.returnedArray = this.enviromentTypes.slice(0, 10);
        this.lengthEnvironmentTypePagination = this.enviromentTypes.length;
      },
      error => {
        console.log(error);
      },
    );
  }
  update(enviromentType: EnviromentType): void {
    this.enviromentType = enviromentType;
    window.scroll(0, 0);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.enviromentTypes.slice(startItem, endItem);
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
      if (willDelete) {
        this.remove(enviromentsTypeId);
      }
    });
  }
}
