import { Component, OnInit } from '@angular/core';
import { Policy } from '../models/policy';
import { FormRegistroPolizaPage } from '../form-registro-poliza/form-registro-poliza.page';
import { ModalController } from '@ionic/angular';
import { ParametrosService } from '../Services/global/parametros.service';
import { BaseCrudFirestoreService } from '../Services/base-crud-firestore.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { PolizaService } from '../Services/poliza.service';
import { FormRegistroClientePage } from '../form-registro-cliente/form-registro-cliente.page';
import { ClientesService } from '../Services/cliente.service';
import { Client } from '../models/client';
import { UsuarioService } from '../Services/usuario.service';

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
    private polizaService:PolizaService,
    private router:Router,
    private usuarioService:UsuarioService
  ) { 
   
  }

  ngOnInit() {

    

  }

  ionViewDidEnter(){
    this.polizaService.list().subscribe(snapshot =>{
      this.Allrows = snapshot;
      console.log(this.rows)
      this.completeRows();
      this.buscar();
    })
  }

  completeRows(){

    this.Allrows.forEach(poliza =>{

      if(poliza.familyMembersRef)
        poliza.numberOfMembres = poliza.familyMembersRef.length +1;
        
      /*if(poliza.clientRef){
        poliza.clientRef.get().then(snap =>{
          console.log(snap.data())
          poliza.clientName = snap.data().firstName+" "+snap.data().lastName;
        });
      }

      if(poliza.agentRef){
        poliza.agentRef.get().then(snap=>{
          console.log(snap.metadata.fromCache)
          poliza.agentName = snap.data().displayName;
        })
      }*/
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
        if(item.clientName){
          retorno =  (item.clientName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
          if(retorno)
            encontrado = true;
        }

        if(item.agentName){
          retorno =  (item.agentName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
          if(retorno)
            encontrado = true;
        } 
        
        if(item.number){
          retorno =  (item.number.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
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

  changeStatus(event){
    console.log(event.target.value);
    let value = event.target.value;
    this.rows = [];
    if(value == "All"){
      this.rows = this.Allrows;
    }
    else{
      this.Allrows.forEach(item => { 
        if(item.status == value)
          this.rows.push(item);
      });
    }
    
  }

  async viewClient(row){
    let poliza = new Policy();
    poliza.asignarValores(row);
    
    poliza.clientRef.get().then(async snap=>{
      let c = new Client();
      c.asignarValores(snap.data());
      c.id = snap.id;
      this.parametrosService.param = {cliente: c, readonly:true};
      const modal = await this.modalController.create({
        component: FormRegistroClientePage
      });
      modal.present();
    })
    
  }


  async editar(poliza){
    let pol = new Policy();
    pol.asignarValores(poliza);

    this.parametrosService.param= {
      poliza:pol
    };

    this.router.navigate(['form-registro-poliza']);  
  }

  async agregar(){
    this.parametrosService.param = "";
    this.router.navigate(['form-registro-poliza']);  
  }

}
