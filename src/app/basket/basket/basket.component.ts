import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { IBasket, IBasketItem } from '../../shared/Models/Basket';

@Component({
  selector: 'app-basket',
  standalone: false,
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit{
  constructor(private service:BasketService){}
  basketobj:IBasket
  ngOnInit(): void {
    this.service.basket.subscribe({
      next:(value)=>{
     this.basketobj=value
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
   
  RemoveBasket(item:IBasketItem)
  {
    this.service.RemoveItemForBasket(item);
  }
  incrementquantity(item:IBasketItem)
  {
    this.service.incremntBasketItemQuantity(item);
  }

  decrementquantity(item:IBasketItem)
  {
    this.service.DecremntBasketItemQuantity(item);
  }
}
