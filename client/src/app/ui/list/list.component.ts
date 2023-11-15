import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  items:any = [1, 2, 3]


  constructor() { }

  ngOnInit(): void {
  }

}
