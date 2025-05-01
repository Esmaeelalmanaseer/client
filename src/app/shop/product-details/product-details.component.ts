import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { IProduct } from '../../shared/Models/Product';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket.service';
import { nextTick } from 'process';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  constructor(private service: ShopService, private route: ActivatedRoute,private tost:ToastrService,private basketservice:BasketService) {}
  prduct: IProduct;
  MainImage: string;
  quantity=1;
  ngOnInit(): void {
    this.loadProduct();
    this.basketservice.basket.subscribe({
      next:(value)=>{
        this.quantity= value.basketItems.find(x=>x.id == this.prduct.id).quantity
      }
    })
  }
  loadProduct() {
    this.service
      .getProductById(parseInt(this.route.snapshot.paramMap.get('id')))
      .subscribe({
        next: (value: IProduct) => {
          this.prduct = value;
          this.MainImage = value.photos[0].imageName;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  ReplaceImage(src: string) {
    this.MainImage = src;
  }
  incrementBasket()
  {
    if(this.quantity <10)
    {
      this.quantity++;
      this.tost.success("item has been aded to the Basket",'SUCCESS');
    }else{
      this.tost.error('You Can not add More than 10 items',"ERROR")
    }
  }

  DecrementBasket()
  {
    if(this.quantity >1)
    {
      this.quantity--;
      this.tost.success("item has been removed to the Basket",'SUCCESS');
    }else{
      this.tost.error('You Can not Decremnt More than 1 items',"ERROR")
    }
  }
  AddToBasket()
  {
    this.basketservice.additemBasket(this.prduct,this.quantity)
  }
  CaluclatDiscount(oldPrice:number,newPrice:number):number
  {
     return parseFloat(
      Math.round(((oldPrice-newPrice)/oldPrice)*100).toFixed(1)
     )
  }
}
