import { IPhoto } from "./Photo"

export interface IProduct {
    id:number
    name: string
    description: string
    oldPrice: number
    newPrice: number
    photos: IPhoto[]
    categoryName: string
  }