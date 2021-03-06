import { Component, OnInit } from '@angular/core';
import { BaseCrudFirestoreService } from '../Services/base-crud-firestore.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ModalController } from '@ionic/angular';
import { FormRegistroClientePage } from '../form-registro-cliente/form-registro-cliente.page';
import { ParametrosService } from '../Services/global/parametros.service';
import { Client } from '../models/client';
import { ArchivosCSVService } from '../Services/archivos-csv.service';
import * as papa from 'papaparse';

@Component({
  selector: 'app-table-clientes',
  templateUrl: './table-clientes.page.html',
  styleUrls: ['./table-clientes.page.scss'],
})
export class TableClientesPage implements OnInit {

  public allRows = [];
  public rows =[];
  public palabraFiltro = "";
  estadoActivo=true;
  estadoInactivo=true;
  estadoPending = true;

  //csvData: any[] = [];
  //headerRow: string[] = ['Id', 'Agent Id', 'First Name', 'Last Name', 'Gender', 'Date of Birth', 'Address', 'Phone', 'Alt Phone', 'Email', 'Status'];

  constructor(
    private baseFireStore:BaseCrudFirestoreService,
    private emailComposer: EmailComposer,
    private modalController:ModalController,
    private parametrosService:ParametrosService,
    private archivosCsv: ArchivosCSVService
  ) {
    this.baseFireStore.setPath("clientes");
   }

  ngOnInit() {

    this.baseFireStore.list().subscribe(snapshot =>{
      this.allRows = snapshot;
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
      this.allRows.forEach(item => {      
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
      this.rows = this.allRows;
    }
  }


  changeStatus(row,event){
    console.log(row)
    console.log(event.target.value);
    row.status = event.target.value;
    this.baseFireStore.update(row).then(data=>{
      console.log(data);
    })
  }

  sendEmail(mail){
    let mailText = "mailto:"+mail; // add the links to body
    window.location.href = mailText;
  }

  async editar(client){
    let cliente = new Client();
    cliente.asignarValores(client);
    this.parametrosService.param = cliente;
    const modal = await this.modalController.create({
      component: FormRegistroClientePage
    });
    modal.present();
  }

  async agregar(){
    const modal = await this.modalController.create({
      component: FormRegistroClientePage
    });
    modal.present();
  }

  seleccionarArchivo(event){
    console.log('archivo seleccionado', event);
    this.archivosCsv.readCsvData(event.detail.value);
  }

  exportar(){
    console.log('exportar');
    console.log('data', this.allRows);
    this.archivosCsv.downloadCSV(this.allRows);
  }

  changeActive(event){
    console.log('changeActive', event.detail.checked);
    this.estadoActivo = event.detail.checked; //cambiamos el estado conforme al valor del check
    this.filtrarPorEstado(); //llamamos a la función filtrar
  }

  changeInactive(event){
    this.estadoInactivo = event.detail.checked; //cambiamos el estado conforme al valor del check
    this.filtrarPorEstado();//llamamos a la función filtrar
  }

  changePending(event){
    this.estadoPending = event.detail.checked; //cambiamos el estado conforme al valor del check
    this.filtrarPorEstado();//llamamos a la función filtrar
  }

  filtrarPorEstado(){
    var retorno = false;
    this.rows = [];
    this.allRows.forEach(item => {      
      var encontrado = false;
      if(this.estadoActivo && item.status==='active'){ 
        //si estadoActivo es true y el item tiene el estado active
        //lo incorporamos al array
        this.rows.push(item);
      }
      if(this.estadoInactivo && item.status==='inactive'){
        //si estadoInactivo es true y el item tiene el estado inactivo
        //lo incorporamos al array
        this.rows.push(item);
      } 
      if(this.estadoPending && item.status==='pending'){
         //si estadoPending es true y el item tiene el estado pendiente
        //lo incorporamos al array
        this.rows.push(item);
      } 
    });   
  }

}
