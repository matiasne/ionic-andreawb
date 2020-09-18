import { Component, OnInit } from '@angular/core';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArchivosPolizaService } from '../Services/archivos-poliza.service';
import { ToastService } from '../Services/toast.service';
import { ModalController } from '@ionic/angular';
import { Archivo } from '../models/archivo';

@Component({
  selector: 'app-upload-file-poliza',
  templateUrl: './upload-file-poliza.page.html',
  styleUrls: ['./upload-file-poliza.page.scss'],
})
export class UploadFilePolizaPage implements OnInit {

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
    private archivosPolizasService:ArchivosPolizaService,
    private toastService:ToastService,
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {

    this.archivosPolizasService.porcentajeSubject.subscribe(data=>{      
      this.porcentaje = data;
    })

    this.archivosPolizasService.listoSubject.subscribe(data=>{
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

    if(!this.nombreArchivo){
      this.toastService.alert("Por favor seleccione una archivo","");
      return;
    }
    console.log("subiendo archivo");  
    this.archivosPolizasService.upload(this.archivo, this.nombreArchivo).then(url =>{
      let file = new Archivo();  
      file.url = url;
      file.name = this.nombreArchivo;
      file.format = this.archivo.type;

      const item = JSON.parse(JSON.stringify(file)); 

      this.archivosPolizasService.add(item).then(data =>{
        console.log(data);
        
      });
    });
     
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
