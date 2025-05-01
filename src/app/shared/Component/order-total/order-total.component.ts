import { Component, OnInit } from '@angular/core';
import { IBasketTotal } from '../../Models/Basket';
import { BasketService } from '../../../basket/basket.service';

@Component({
  selector: 'app-order-total',
  standalone: false,
  templateUrl: './order-total.component.html',
  styleUrl: './order-total.component.scss'
})
export class OrderTotalComponent implements OnInit{
  basktotal:IBasketTotal
  constructor(private service:BasketService){}
  ngOnInit(): void {
   this.service.baskettotal.subscribe({
    next:(value)=>{
      this.basktotal=value
    },
    error(err){
      console.log(err)
    }
   })
  }

}
