import { Component, OnInit } from '@angular/core';
import { UnitService } from './unit.service';
import { Unit } from './unit';
import swal from 'sweetalert';

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

  ngOnInit() {
    this.getStates();
    this.load();
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
