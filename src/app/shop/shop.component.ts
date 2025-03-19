import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { IPagnation } from '../shared/Models/Pagnation';
import { IProduct } from '../shared/Models/Product';
import { ICategory } from '../shared/Models/Category';
import { ProductParam } from '../shared/Models/ProductParam';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{
  constructor(private service:ShopService){}
  ngOnInit(): void {
    this.GetAllProduct();
    this.GetCategoty();
  }

  LstProduct:IProduct[]=[];
  LstCategory:ICategory[];
  ProductParam=new ProductParam();
  TotalCount:number;
GetAllProduct()
{
  this.service.getProduct(this.ProductParam).subscribe({
    next:((value:IPagnation)=>{
       this.LstProduct=value.data;
       this.TotalCount=value.totalCount
       this.ProductParam.PageNumber =value.pageNumber
       this.ProductParam.pageSize=value.pageSize
    }) 
  })
}
GetCategoty()
{
  this.service.getCategory().subscribe({
    next:((values:ICategory[])=>{
     this.LstCategory=values
    })
  })
}

Selectedid(categoryid:number)
{
  this.ProductParam.CategoryId=categoryid;
  this.GetAllProduct();
}
//sorting by price
SortingOption=[{
  name:'Price',value:'Name'
},{name:'Price:min-max',value:'PriceAsc'},
{name:'Price:max-min',value:'PriceDes'}
]
SortingByPrice(sort:Event)
{
 this.ProductParam.SortSelected=(sort.target as HTMLInputElement).value
 this.GetAllProduct();
}
OnSearch(search:string)
{
  this.ProductParam.Search=search;
  this.GetAllProduct();
}
@ViewChild('search') searchInput:ElementRef
@ViewChild('sortSelected') selected:ElementRef
ResetValue()
{
  this.ProductParam.Search='';
  this.ProductParam.SortSelected='';
  this.ProductParam.CategoryId=0;
  this.searchInput.nativeElement.value='';
  this.selected.nativeElement.selectIndex=0;
  this.GetAllProduct();
}
OnPageChange(event:any)
{
  this.ProductParam.PageNumber=event;
  this.GetAllProduct();
}
}
