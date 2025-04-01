import { v4 as uuidv4 } from 'uuid';
export interface IBasket {
    id: string
    basketItems: IBasketItem[]
  }
  
  export interface IBasketItem {
    id: number
    name: string
    quantity: number
    image: string
    price: number
    category: string
  }

  export class Basket implements IBasket{
      id = uuidv4()
      basketItems: IBasketItem[]

  }