import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EvaluationComponent } from './evaluation.component';
import { EvaluationRoutes } from './evaluation.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EvaluationRoutes),
    SharedModule
  ],
  declarations: [EvaluationComponent]
})

export class EvaluationModule { }
