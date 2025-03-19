import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { IProduct } from '../../shared/Models/Product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
constructor(private service:ShopService,private route:ActivatedRoute){}
prduct:IProduct
MainImage:string
  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct()
  {
       this.service.getProductById(parseInt(this.route.snapshot.paramMap.get('id'))).subscribe({
        next:(value:IProduct)=>{
          this.prduct=value
          this.MainImage=value.photos[0].imageName
        },
        error:err=>{
          console.log(err)
        }
       })
  }
  ReplaceImage(src:string)
  {
       this.MainImage=src;
  }
}
