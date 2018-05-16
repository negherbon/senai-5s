import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { SharedModule } from './shared/shared.module';
import { BreadcrumbsComponent } from './layouts/admin/breadcrumbs/breadcrumbs.component';
import { TitleComponent } from './layouts/admin/title/title.component';
import { LocationStrategy, PathLocationStrategy, CommonModule} from '@angular/common';
import { NgDatepickerModule } from 'ng2-datepicker';
import { UserComponent } from './users/user.component';
import { UserService } from './users/user.service';
import { UnitService } from './units/unit.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { EnviromentTypeService } from './enviroments-type/enviroment-type.service';
import { EnviromentService } from './enviroments/enviroment.service';
import { QuestionService } from './questions/question.service';
import { EvaluationService } from './evaluations/evaluation.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    BreadcrumbsComponent,
    TitleComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    NgDatepickerModule,
  ],
  providers: [
    UserService, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    UnitService, EnviromentTypeService, EnviromentService, QuestionService, EvaluationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
