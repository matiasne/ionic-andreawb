import { Component, OnInit } from '@angular/core';
import { CompaniaService } from '../Services/compania.service';
import { ComisionesService } from '../Services/comisiones.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../Services/loading.service';
import { ToastService } from '../Services/toast.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { AlertController, ModalController } from '@ionic/angular';
import { UploadComisionPage } from '../upload-comision/upload-comision.page';

@Component({
  selector: 'app-table-comisiones',
  templateUrl: './table-comisiones.page.html',
  styleUrls: ['./table-comisiones.page.scss'],
})
export class TableComisionesPage implements OnInit {

  public companias = [];
  
  

  public Allrows =[];
  public rows =[];

  public palabraFiltro ="";
  public porcentaje ="";

  constructor(
    private companiaService:CompaniaService,
    private comisionesService:ComisionesService,
    private loadingService:LoadingService,
    private toastService:ToastService,
    private alertController:AlertController,
    private modalController:ModalController
  ) { }

  ngOnInit() {

    this.companiaService.list().subscribe(snapshot=>{
      console.log(snapshot)
      this.companias = snapshot;
    });

    this.loadingService.presentLoading();
    this.comisionesService.list().subscribe(snapshot =>{
      this.Allrows = snapshot;
      console.log(this.Allrows);
      this.loadingService.dismissLoading();
      this.Allrows.forEach(r =>{
        if(r.createdAt)
          r.createdAt = r.createdAt.toDate();
      })
      this.buscar();
    });

    this.comisionesService.borradoSubject.subscribe(data=>{
      if(data){
        this.toastService.mensaje("","Archivo eliminado")
      }
    })
  }

  onChange(event){
    this.palabraFiltro = event.target.value;
    this.buscar();
  }

  changeCompany(event){
    console.log(event.target.value);
    let value = event.target.value;
    this.rows = [];
    if(value == "All"){
      this.rows = this.Allrows;
    }
    else{
      this.Allrows.forEach(item => { 
        if(item.companiaNombre == value)
          this.rows.push(item);
      });
    }
    
  }

  buscar(){ 

    if(this.palabraFiltro != ""){

      var palabra = this.palabraFiltro.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      var retorno = false;
      this.rows = [];      
      this.Allrows.forEach(item => {      
  
        var encontrado = false;

        if(item.fileName){
          retorno =  (item.fileName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
          if(retorno)
            encontrado = true;
        }

        if(item.companiaNombre){
          retorno =  (item.companiaNombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
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

  async showUpload(){
    const modal = await this.modalController.create({
      component: UploadComisionPage,
    });
    return await modal.present();
  }

  confirmDelete(item){
    this.loadingService.presentLoading();
    this.comisionesService.deleteArchivo(item);
  }

  async delete(item) {
    
    const alert = await this.alertController.create({
      header: 'Esta seguro?',
      message: 'Eliminar archivo:'+item.fileName+'?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Si',
          handler: () => { 
            this.confirmDelete(item);
          }
        }
      ]
    });

    await alert.present();
  }

  

}
