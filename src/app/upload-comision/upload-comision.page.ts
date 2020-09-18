import { Component, OnInit } from '@angular/core';
import { CompaniaService } from '../Services/compania.service';
import { FileSystemDirectoryEntry, NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ComisionesService } from '../Services/comisiones.service';
import { ModalController } from '@ionic/angular';
import { ToastService } from '../Services/toast.service';

@Component({
  selector: 'app-upload-comision',
  templateUrl: './upload-comision.page.html',
  styleUrls: ['./upload-comision.page.scss'],
})
export class UploadComisionPage implements OnInit {


  public companias =[];
  public companiaSeleccionada:any;

  public files: NgxFileDropEntry[] = [];

  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });

  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public archivo:File;
  public URLPublica = '';
  public porcentaje =0;

  constructor(
    private companiaService:CompaniaService,
    private comisionesService:ComisionesService,
    private modalCtrl:ModalController,
    private toastService:ToastService
  ) { }

  ngOnInit() {

    this.companiaService.list().subscribe(snapshot=>{
      console.log(snapshot)
      this.companias = snapshot;
    });

    this.comisionesService.porcentajeSubject.subscribe(data=>{      
      this.porcentaje = data;
    })

    this.comisionesService.listoSubject.subscribe(data=>{
      if(data){
        this.toastService.mensaje("","Archivo Subido");
        this.modalCtrl.dismiss(); 
      }
    })

    

  }

  //Evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo(event) {
    
    this.datosFormulario.delete('archivo');
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name; 
        this.archivo = event.target.files[i];
               
       
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }    
  }

 
  public subirArchivo() {

    if(!this.companiaSeleccionada){
      this.toastService.alert("Por favor seleccione una compania","");
      return;
    }

    if(!this.nombreArchivo){
      this.toastService.alert("Por favor seleccione una archivo","");
      return;
    }
    console.log("subiendo archivo");  
    this.comisionesService.upload(this.archivo,this.nombreArchivo,this.companiaSeleccionada);  
     
  }


  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
 
          console.log(droppedFile.relativePath);
          // Here you can access the real file
          console.log(file);
 
          this.archivo = file;
          this.nombreArchivo = droppedFile.relativePath;
    
          
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
 
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }

}
