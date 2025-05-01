import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheakoutRoutingModule } from './cheakout-routing.module';
import { CheakoutComponent } from './cheakout/cheakout.component';


@NgModule({
  declarations: [
    CheakoutComponent
  ],
  imports: [
    CommonModule,
    CheakoutRoutingModule
  ]
})
export class CheakoutModule { }
