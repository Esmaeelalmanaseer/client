import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor(private service:NgxSpinnerService) { }
  requesetCount=0;
  Loading()
  {
    this.requesetCount++
    this.service.show(undefined,{
      bdColor : "rgba(0, 0, 0, 0.8)",
      size : "large",
      color : "#fff",
      type : "square-jelly-box",
      fullScreen : true
    })
  }
  hideLoader()
  {
    this.requesetCount--
    if(this.requesetCount <= 0)
    {
      this.requesetCount--;
      this.requesetCount=0
      this.service.hide();
    }
  }
}
