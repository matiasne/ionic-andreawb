import { Component, OnInit } from '@angular/core';
import { CompaniaService } from '../Services/compania.service';

@Component({
  selector: 'app-table-comisiones',
  templateUrl: './table-comisiones.page.html',
  styleUrls: ['./table-comisiones.page.scss'],
})
export class TableComisionesPage implements OnInit {

  public companias = [];
  
  constructor(
    private companiaService:CompaniaService
  ) { }

  ngOnInit() {

    this.companiaService.list().subscribe(snapshot=>{
      console.log(snapshot)
      this.companias = snapshot;
    })

  }

}
