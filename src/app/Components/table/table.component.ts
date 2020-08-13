import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { BaseCrudFirestoreService } from 'src/app/Services/base-crud-firestore.service';

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
  @Input() columns: any;
  @Input() rows: any;


  constructor(
  ) {

    
   }

  ngOnInit() {

    

  }

}
