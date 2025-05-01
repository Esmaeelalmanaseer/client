import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/Models/Basket';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  constructor(private service:BasketService){}
  count:Observable<IBasket>
  ngOnInit(): void {
    const BasketID=localStorage.getItem('basketkey')
    this.service.GetBasket(BasketID).subscribe({
      next:(value)=>{
        console.log(value)
        this.count=this.service.basket
      },error:(err)=>{
        console.log(err)
      }
    })
  }
visibale:boolean=false;
  ToggleDropDown()
  {
     this.visibale=!this.visibale;
  }

}
