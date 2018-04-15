import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { QuestionComponent } from './question.component'
import { QuestionRoutes } from './question.routing';
import { SharedModule } from '../shared/shared.module';
import { SelectModule } from 'ng-select';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(QuestionRoutes),
    SharedModule,
    SelectModule
  ],
  declarations: [QuestionComponent]
})

export class QuestionModule { }
