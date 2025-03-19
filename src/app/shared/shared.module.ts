import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent,  PaginationModule } from 'ngx-bootstrap/pagination';
import { PagnationComponent } from './Component/pagnation/pagnation.component';


@NgModule({
  declarations: [
    PagnationComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],exports:[
    PaginationModule,
    PagerComponent,
    PagnationComponent
  ] 
})
export class SharedModule { }
