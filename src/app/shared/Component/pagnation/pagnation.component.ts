import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagnation',
  standalone: false,
  templateUrl: './pagnation.component.html',
  styleUrl: './pagnation.component.scss'
})
export class PagnationComponent {
@Input() PageSize: number;
@Input() TotalCount : number;
@Output() PageChange=new EventEmitter()

OnPageChange(ev:any)
{
  this.PageChange.emit(ev)
}
}
