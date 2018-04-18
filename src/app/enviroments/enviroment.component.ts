import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EnviromentService} from './enviroment.service';
import { UnitService } from '../units/unit.service';
import { Enviroment } from './enviroment';
import { Unit } from '../units/unit';
import { User } from '../users/user';
import { EnviromentTypeService } from '../enviroments-type/enviroment-type.service';
import { UserService } from '../users/user.service';
import { EnviromentType } from '../enviroments-type/enviroment-type';
import swal from 'sweetalert';

@Component({
  selector: 'app-enviroment',
  templateUrl: './enviroment.component.html',
  styleUrls: ['./enviroment.component.css']
})

export class EnviromentComponent implements OnInit {

  enviroment: Enviroment = new Enviroment();
  enviroments: Enviroment[];
  units: Unit[];
  users: User[];
  unitSelected: any;
  enviromentTypes: EnviromentType[];

  constructor(
      private enviromentService: EnviromentService,
      private unitService: UnitService,
      private enviromentTypeService: EnviromentTypeService,
      private userService: UserService
    ) {}

  ngOnInit() {
    this.loadUnits();
    this.loadEnviromentTypes();
    this.loadResponsibles();
    this.load();
  }

  save(enviroment): void {
    if (!enviroment.id) {
      this.enviromentService.save(enviroment)
        .subscribe(res => {
          this.getValidation(res);
          this.load();
      });
    } else {
      this.enviromentService.update(enviroment)
      .subscribe(res => {
        this.getValidation(res);
        this.load();
      });
    }
  }

  loadResponsibles() {
    this.userService.load()
    .subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.log(error);
      }
    );
  }

  loadUnits() {
    this.unitService.load()
    .subscribe(
      units => {
        this.units = units;
      },
      error => {
        console.log(error);
      }
    );
  }

  loadEnviromentTypes() {
    this.enviromentTypeService.load()
    .subscribe(
      enviromentTypes => {
        this.enviromentTypes = enviromentTypes;
      },
      error => {
        console.log(error);
      }
    );
  }

  load() {
    this.enviromentService.load()
    .subscribe(
      enviroments => {
        this.enviroments = enviroments;
      },
      error => {
        console.log(error);
      },
    );
  }

  update(enviroment: Enviroment): void {
    this.enviroment = enviroment;
    window.scroll(0, 0);
  }

  remove(id: string): void {
    this.enviromentService.remove(id)
    .subscribe((res) => {
      swal('', res['message'], 'success');
      this.load();
    });
  }

  getValidation(res) {
    swal({
      title: '',
      text: res['status'] === 201 ? 'Ambiente salvo com sucesso!' : 'Ocorreu um problema ao tentar salvar!',
      icon: 'success'
    });
  }

  getModalAnswer(enviromentId) {
    swal({
      title: 'Exclusão de ambiente',
      text: 'Tem certeza que deseja excluir o ambiente?',
      buttons: ['Cancelar', 'OK'],
      icon: 'warning',
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.remove(enviromentId);
      }
    });
  }
}
