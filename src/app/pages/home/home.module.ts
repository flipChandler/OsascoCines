import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { BaseTemplateComponent } from 'src/app/shared/templates/base-template/base-template.component';
import { BaseTemplateModule } from 'src/app/shared/templates/base-template/base-template.module';

const routes: Routes = [
  {
    path: "",
    component: BaseTemplateComponent,
    children: [
      { path: "", component: HomeComponent }
    ] 
  }
]

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BaseTemplateModule
  ],
  exports: [
    RouterModule
  ]
})
export class HomeModule { }
