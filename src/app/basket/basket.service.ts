import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IBasket } from '../shared/Models/Basket';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private http: HttpClient) {}
  baseURL = 'https://localhost:7247/api/';
  private BasketSource = new BehaviorSubject<IBasket>(null);
  basket = this.BasketSource.asObservable();
  GetBasket(id: string) {
    return this.http.get(this.baseURL + 'Baskets/get-basket-item/' + id).pipe(
      map((res: IBasket) => {
        this.BasketSource.next(res);
      })
    );
  }
  SetBasket(basket: IBasket) {
    return this.http.post(this.baseURL+'Baskets/update-basket', basket).subscribe({
      next:(value:IBasket){
      this.BasketSource.next(value)
      },
      error(err){
        console.log(err)
      }
    });
  }
  GetCurrnetValue()
  {
    return this.BasketSource;
  }
}
