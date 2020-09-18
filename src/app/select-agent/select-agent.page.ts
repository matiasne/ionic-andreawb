import { Component, OnInit } from '@angular/core';
import { FormRegistroClientePage } from '../form-registro-cliente/form-registro-cliente.page';
import { BaseCrudFirestoreService } from '../Services/base-crud-firestore.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ModalController } from '@ionic/angular';
import { ParametrosService } from '../Services/global/parametros.service';
import { AgentesService } from '../Services/agentes.service';

@Component({
  selector: 'app-select-agent',
  templateUrl: './select-agent.page.html',
  styleUrls: ['./select-agent.page.scss'],
})
export class SelectAgentPage implements OnInit {

  public Allrows = [];
  public rows =[];
  public palabraFiltro = "";
  public modal:any;
  constructor(
    private agentesService:AgentesService,
    private emailComposer: EmailComposer,
    private modalController:ModalController,
    private parametrosService:ParametrosService
  ) {
    
   }

  ngOnInit() {

    this.agentesService.list().subscribe(snapshot =>{
      this.Allrows = snapshot;
      console.log(this.Allrows)
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

  seleccionar(event){
    if(event.type == 'click') {
      this.modalController.dismiss(event.row);
    }
  }

  async agregar(){   
    this.modalController.dismiss("crear");    
  }

  clickIcono($event){
    this.modalController.dismiss();
  }

}
