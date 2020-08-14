import { Component, OnInit } from '@angular/core';
import { Policy } from '../models/policy';
import { FormRegistroPolizaPage } from '../form-registro-poliza/form-registro-poliza.page';
import { ModalController } from '@ionic/angular';
import { ParametrosService } from '../Services/global/parametros.service';
import { BaseCrudFirestoreService } from '../Services/base-crud-firestore.service';

@Component({
  selector: 'app-table-polizas',
  templateUrl: './table-polizas.page.html',
  styleUrls: ['./table-polizas.page.scss'],
})
export class TablePolizasPage implements OnInit {

  public Allrows = [];
  public rows =[];
  public palabraFiltro = "";

  constructor(
    private modalController:ModalController,
    private parametrosService:ParametrosService,
    private baseFireStore:BaseCrudFirestoreService
  ) { 
    this.baseFireStore.setPath("polizas");
  }

  ngOnInit() {

    this.baseFireStore.list().subscribe(snapshot =>{
      this.Allrows = snapshot;
      console.log(this.rows)
      this.buscar();
    })

  }

  onChange(event){
    this.palabraFiltro = event.target.value;
    this.buscar();
  }


  buscar(){ 

    if(this.palabraFiltro != ""){

      var palabra = this.palabraFiltro.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
     var retorno = false;

      this.rows = [];
      
      this.Allrows.forEach(item => {      
  
        var encontrado = false;
        if(item.firstName){
          retorno =  (item.firstName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
          if(retorno)
            encontrado = true;
        }

        if(item.LastName){
          retorno =  (item.LastName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
          if(retorno)
            encontrado = true;
        }         
       
        if(encontrado){
          this.rows.push(item);
          return true;
        }

      });   
    }
    else{
      this.rows = this.Allrows;
    }
  }


  async editar(client){
    let cliente = new Policy();
    cliente.asignarValores(client);
    this.parametrosService.param = cliente;
    const modal = await this.modalController.create({
      component: FormRegistroPolizaPage
    });
    modal.present();
  }

  async agregar(){
    const modal = await this.modalController.create({
      component: FormRegistroPolizaPage
    });
    modal.present();
  }

}
