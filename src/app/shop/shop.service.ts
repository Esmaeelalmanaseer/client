import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagnation } from '../shared/Models/Pagnation';
import { ICategory } from '../shared/Models/Category';
import { ProductParam } from '../shared/Models/ProductParam';
import { IProduct } from '../shared/Models/Product';
@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http:HttpClient) { }
  baseURL='https://localhost:7247/api/';
  getProduct(ProductParam:ProductParam)
  {
    let params=new HttpParams();
    if(ProductParam.CategoryId)
    {
    params=params.append('CategoryId',ProductParam.CategoryId)
    }
    if(ProductParam.SortSelected)
    {
      params=params.append('sort',ProductParam.SortSelected)
    }
    if(ProductParam.Search)
    {
      params=params.append('Search',ProductParam.Search)
    }
    params=params.append("PageNumber",ProductParam.PageNumber)
    params=params.append("pageSize",ProductParam.pageSize)
    return this.http.get<IPagnation>(this.baseURL+'Product/get-all',{params:params})
  }
  getCategory()
  {
    return this.http.get<ICategory[]>(this.baseURL+'Category/get-all')
  }
  getProductById(id:number)
  {
    return this.http.get<IProduct>(this.baseURL+'Product/get-by-id/'+id)
  }
}
