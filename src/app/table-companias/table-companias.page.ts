import { Component, OnInit } from '@angular/core';
import { BaseCrudFirestoreService } from '../Services/base-crud-firestore.service';
import { ModalController } from '@ionic/angular';
import { ParametrosService } from '../Services/global/parametros.service';
import { UsuarioService } from '../Services/usuario.service';
import { Company } from '../models/company';
import { FormRegistroCompaniasPage } from '../form-registro-companias/form-registro-companias.page';

@Component({
  selector: 'app-table-companias',
  templateUrl: './table-companias.page.html',
  styleUrls: ['./table-companias.page.scss'],
})
export class TableCompaniasPage implements OnInit {

  public Allrows = [];
  public rows =[];
  public palabraFiltro = "";

  constructor(
    private baseFireStore:BaseCrudFirestoreService,
    //private emailComposer: EmailComposer,
    private modalController:ModalController,
    private parametrosService:ParametrosService,
    private usuarioService:UsuarioService
    ) {
    this.baseFireStore.setPath("companias");
   }

  ngOnInit() {
    this.baseFireStore.list().subscribe(snapshot =>{
      this.Allrows = snapshot;
      this.buscar();
    });
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
        if(item.name){
          retorno =  (item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
          if(retorno)
            encontrado = true;
        }
        /*    
        if(item.email){
          retorno =  (item.email.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
          if(retorno)
            encontrado = true;
        } */
        if(encontrado){
          this.rows.push(item);
          return true;
        }
      });   
    }
    else{
      this.rows = this.Allrows;
    }

    console.log('rows', this.rows);
  }

  /*sendEmail(mail){
    let mailText = "mailto:"+mail; // add the links to body
    window.location.href = mailText;
  }*/

  async abrir(company){
    let compania = new Company();
    compania.asignarValores(company);
    this.parametrosService.param = {
      compania: compania
    };
    const modal = await this.modalController.create({
      component: FormRegistroCompaniasPage
    });
    modal.present();
  }

  async agregar(){
    this.parametrosService.param= {compania:""};
    const modal = await this.modalController.create({
      component: FormRegistroCompaniasPage
    });
    modal.present();
  }

}
