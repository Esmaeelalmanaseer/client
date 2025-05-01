import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import {
  Basket,
  IBasket,
  IBasketItem,
  IBasketTotal,
} from '../shared/Models/Basket';
import { IProduct } from '../shared/Models/Product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private http: HttpClient) {}
  baseURL = 'https://localhost:7247/api/';
  private BasketSource = new BehaviorSubject<IBasket>(null);
  basket = this.BasketSource.asObservable();
  private baskettotalSource = new BehaviorSubject<IBasketTotal>(null);
  baskettotal = this.baskettotalSource.asObservable();

  clacualtTotal() {
    const basket = this.GetCurrnetValue();
    const shipping = 0;
    const subtotal = basket.basketItems.reduce((a, c) => {
      return c.price * c.quantity + a;
    }, 0);
    const total = shipping + subtotal;
    this.baskettotalSource.next({
      shipping,
      subtotal,
      total,
    });
  }

  GetBasket(id: string) {
    return this.http.get(this.baseURL + 'Baskets/get-basket-item/' + id).pipe(
      map((res: IBasket) => {
        this.BasketSource.next(res);
        this.clacualtTotal();
        return res;
      })
    );
  }
  SetBasket(basket: IBasket) {
    return this.http
      .post(this.baseURL + 'Baskets/update-basket', basket)
      .subscribe({
        next: (value: IBasket) => {
          this.BasketSource.next(value);
          this.clacualtTotal();
          console.log(value);
        },
        error(err) {
          console.log(err);
        },
      });
  }
  GetCurrnetValue() {
    return this.BasketSource.value;
  }
  additemBasket(product: IProduct, quantity: number = 1) {
    const Itemadd: IBasketItem = this.MapProductToBasketItem(product, quantity);
    let basket = this.GetCurrnetValue();
    if (basket.id == null) {
      basket = this.CreateBasket();
    }

    basket.basketItems = this.AddOrUpdate(
      basket.basketItems,
      Itemadd,
      quantity
    );
    return this.SetBasket(basket);
  }
  private AddOrUpdate(
    basketItems: IBasketItem[],
    Itemadd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    const index = basketItems.findIndex((i) => i.id === Itemadd.id);
    if (index == -1) {
      Itemadd.quantity = quantity;
      basketItems.push(Itemadd);
    } else {
      basketItems[index].quantity += quantity;
    }
    return basketItems;
  }
  private CreateBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basketkey', basket.id);
    return basket;
  }
  MapProductToBasketItem(product: IProduct, quantity: number): IBasketItem {
    return {
      id: product.id,
      category: product.categoryName,
      image: product.photos[0].imageName,
      name: product.name,
      price: product.newPrice,
      quantity: quantity,
      description: product.description,
    };
  }
  incremntBasketItemQuantity(item: IBasketItem) {
    const basket = this.GetCurrnetValue();
    const itemindex = basket.basketItems.findIndex((i) => i.id === item.id);
    basket.basketItems[itemindex].quantity++;
    this.SetBasket(basket);
  }

  DecremntBasketItemQuantity(item: IBasketItem) {
    const basket = this.GetCurrnetValue();
    const itemindex = basket.basketItems.findIndex((i) => i.id === item.id);
    if (basket.basketItems[itemindex].quantity > 0) {
      basket.basketItems[itemindex].quantity--;
      this.SetBasket(basket);
    } else {
      this.RemoveItemForBasket(item);
    }
  }
  RemoveItemForBasket(item: IBasketItem) {
    const basket = this.GetCurrnetValue();
    if (basket.basketItems.some((i) => i.id === item.id)) {
      basket.basketItems = basket.basketItems.filter((x) => x.id !== item.id);
      if (basket.basketItems.length > 0) {
        this.SetBasket(basket);
      } else {
        this.DeleteBasketItem(basket);
      }
    }
  }
  DeleteBasketItem(basket: IBasket) {
    return this.http
      .delete(this.baseURL + 'delete-basket-item/' + basket.id)
      .subscribe({
        next: (value) => {
          this.BasketSource = null;
          localStorage.removeItem('basketkey');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
