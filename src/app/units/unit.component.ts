import { Component, OnInit } from '@angular/core';
import { UnitService } from './unit.service';
import { Unit } from './unit';
import swal from 'sweetalert';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html'
})

export class UnitComponent implements OnInit {

  constructor( public unitService: UnitService) { }

  cities: any;
  states: any;
  units: Unit[];
  unit: Unit = new Unit();

  //Filter and pagination
  returnedArray: Unit[];
  lengthUnitPagination: number;

  ngOnInit() {
    this.getStates();
    this.load();
  }

  findUnits(typed: string){
    typed = typed.toLowerCase();
    this.returnedArray = this.units.filter(unit => unit.name.toLowerCase().includes(typed));
    this.lengthUnitPagination = this.returnedArray.length;
  }

  getStates() {
    this.unitService.getStates().subscribe(
      states => {
        this.states = states;
      },
      error => {
        console.log(error);
      },
    );
    console.log(this.states);
  }

  getCities(stateId) {
    this.unitService.getCities(stateId).subscribe(
      cities => {
        this.cities = cities;
      },
      error => {
        console.log(error);
      },
    );
    console.log(this.cities);
  }

  save(unit): void {
    if (!unit.id) {
      this.unitService.save(unit)
        .subscribe(res => {
          this.getValidation(res);
          this.load();
          this.unit = new Unit();  // reseta valores do formulário
      });
    } else {
      this.unitService.update(unit)
      .subscribe(res => {
        this.getValidation(res);
        this.load();
        this.unit = new Unit(); // reseta valores do formulário
      });
    }
  }

  getValidation(res) {
    swal({
      title: '',
      text: res['status'] === 201 ? 'Unidade salva com sucesso!' : 'Ocorreu um problema ao tentar salvar!',
      icon: 'success'
    });
  }

  load() {
    this.unitService.load()
    .subscribe(
      units => {
        this.units = units;
        this.returnedArray = this.units.slice(0, 10);
        this.lengthUnitPagination = this.units.length;
      },
      error => {
        console.log(error);
      },
    );
  }

  update(unit: Unit): void {
    this.getCities(unit.state);
    this.unit = unit;
    window.scroll(0, 0);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.units.slice(startItem, endItem);
  }
  
  /* NASS: Colocar icones e mensagens de acordo com retorno da api */
  remove(id: string): void {
    this.unitService.remove(id)
    .subscribe((res) => {
      swal('', res['message'], 'success');
      this.load();
    });
  }

  getModalAnswer(unitId) {
    swal({
      title: 'Exclusão de unidade',
      text: 'Tem certeza que deseja excluir a unidade?',
      buttons: ['Cancelar', 'OK'],
      icon: 'warning',
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.remove(unitId);
      }
    });
  }
}
