import { Component, OnInit, ViewEncapsulation } from '@angular/core';

export interface Data {
  movies: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {

  public data: Data;
  public columns: any;
  public rows: any;


  constructor() {

    this.rows = [
      {
        "name": "Ethel Price",
        "gender": "female",
        "age": 22
      },
      {
        "name": "Claudine Neal",
        "gender": "female",
        "age": 55
      },
      {
        "name": "Beryl Rice",
        "gender": "female",
        "age": 67
      },
      {
        "name": "Simon Grimm",
        "gender": "male",
        "age": 28
      }
    ];

    this.columns = [
      { name: 'Name' },
      { name: 'Company' },
      { name: 'Genre' }
    ];
   }

  ngOnInit() {}

}
