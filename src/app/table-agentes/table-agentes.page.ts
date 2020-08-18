import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ModalController, AlertController } from '@ionic/angular';
import { UsuarioService } from '../Services/usuario.service';
import { AgentesService } from '../Services/agentes.service';

@Component({
  selector: 'app-table-agentes',
  templateUrl: './table-agentes.page.html',
  styleUrls: ['./table-agentes.page.scss'],
})
export class TableAgentesPage implements OnInit {

  public Allrows = [];
  public rows =[];
  public palabraFiltro = "";

  constructor(
    private emailComposer: EmailComposer,
    private modalController:ModalController,
    private agenteService:AgentesService,
    private alertController:AlertController,
    private usuarioService:UsuarioService
  ) {
    
  }

  ngOnInit() {
    var sub = this.agenteService.list().subscribe(snapshot =>{
      this.Allrows = snapshot;
      console.log(this.Allrows)

      
      this.Allrows.forEach((item,index) => {  
        console.log(item)
        if(this.usuarioService.getUID() == item.id){
          console.log("!!!!")
          this.Allrows.splice(index,1);
        }
      });

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
        if(item.displayName){
          retorno =  (item.displayName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
          if(retorno)
            encontrado = true;
        }

     
        
        if(item.email){
          retorno =  (item.email.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
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

  async toggleHabilitarAgente(row,event){
   
    row.rolAgente = event.detail.checked;   
    this.agenteService.update(row);
    
  }

  async toggleHabilitarAdmin(row,event){
   
      row.rolAdmin = event.detail.checked;
   
          
    this.agenteService.update(row);
    
  }
  

  sendEmail(mail){
    let mailText = "mailto:"+mail; // add the links to body
    window.location.href = mailText;
  }

}
