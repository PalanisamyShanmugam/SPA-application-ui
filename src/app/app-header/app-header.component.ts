import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  constructor() { }
  showVar: string = "showProject";
  ngOnInit() {
  }
    toggleChild(value:string){
       this.showVar =value;
     
    }}
