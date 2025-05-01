import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent,  PaginationModule } from 'ngx-bootstrap/pagination';
import { PagnationComponent } from './Component/pagnation/pagnation.component';
import { RouterModule } from '@angular/router';
import { OrderTotalComponent } from './Component/order-total/order-total.component';


@NgModule({
  declarations: [
    PagnationComponent,
    OrderTotalComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    RouterModule
  ],exports:[
    PaginationModule,
    PagerComponent,
    PagnationComponent,
    OrderTotalComponent
  ] 
})
export class SharedModule { }
