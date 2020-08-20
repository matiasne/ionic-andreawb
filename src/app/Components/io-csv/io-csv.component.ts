/*
  Ejecutar en consola:
  npm install file-saver --save
  npm install @types/file-saver --save
  npm install papaparse --save
  npm install @types/papaparse --save
  npm install ngx-file-drop --save

  Agregar en el .module de la página donde se quiera usar el componente o en app.module.ts
  import { NgxFileDropModule } from 'ngx-file-drop';
  import { IoCsvComponent } from '../io-csv/io-csv.component';
  y
  NgxFileDropModule, en el array de imports
  y en el array declarations agragrmos:
  IoCsvComponent

  en la plantilla de la clase en que se quiere usar se coloca
  <app-io-csv (import)="importar($event)" [data]="clientes" [nombreArchivo]="nombreArchivo"></app-io-csv>
  y en la clase
  nombreArchivo: string = 'nombreArchivo';
  importar(objects: any[]){
    this.clientes = objects;
  }
  this.clientes es un array de objetos de tipo Client pero puede cualquier otro tipo.

  se puede ver un ejemplo de uso de papaparse en 
  https://devdactic.com/csv-data-ionic/
  y la documentación en
  https://www.papaparse.com/
  https://www.papaparse.com/docs#local-files
*/
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import * as papa from 'papaparse';
import * as fileSaver from 'file-saver';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-io-csv',
  templateUrl: './io-csv.component.html',
  styleUrls: ['./io-csv.component.scss'],
})
export class IoCsvComponent {

  public files: NgxFileDropEntry[] = [];
  @Output() import: EventEmitter<any[]> = new EventEmitter<any[]>();
  objects: any[];
  @Input() data: any[];
  @Input() nombreArchivo: string;

  constructor( ) { }

  exportar(){
    //convertimos a string
    let result = papa.unparse(this.data, {
      header: true
    });
    //guardamos en un archivo con extensión csv
    var blob = new Blob([result], {type: 'text/csv'})
    fileSaver.saveAs(blob, this.nombreArchivo+'.csv');
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          if(file.type == 'text/csv'){
            this.importar(file);
          }else{
            console.log('extension incorrecta');
          }     
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log('droppedFile.relativePath', droppedFile.relativePath, fileEntry);
      }
    }
  }

  importar(file: File){
    //convertimos el archivo en array de objetos
    papa.parse(file, {
      header: true, //incorporamos cabeceras
      complete: result =>{
        //emitimos los resultados al padre
        console.log('result', result);
        this.import.emit(result.data);
      }
    });
  }

}
