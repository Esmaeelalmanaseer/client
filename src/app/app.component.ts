import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { __values } from 'tslib';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  constructor(){}

 

  ngOnInit(): void {
  }
  title = 'client';
}
