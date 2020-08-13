import { Component, OnInit } from '@angular/core';
import { BaseCrudFirestoreService } from '../Services/base-crud-firestore.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ModalController } from '@ionic/angular';
import { FormRegistroClientePage } from '../form-registro-cliente/form-registro-cliente.page';
import { ParametrosService } from '../Services/global/parametros.service';
import { Client } from '../models/client';

@Component({
  selector: 'app-table-clientes',
  templateUrl: './table-clientes.page.html',
  styleUrls: ['./table-clientes.page.scss'],
})
export class TableClientesPage implements OnInit {

  public Allrows = [];
  public rows =[];
  public palabraFiltro = "";

  constructor(
    private baseFireStore:BaseCrudFirestoreService,
    private emailComposer: EmailComposer,
    private modalController:ModalController,
    private parametrosService:ParametrosService
  ) {
    this.baseFireStore.setPath("clientes");
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

}
