import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { ToastController } from '@ionic/angular';
import { Client } from '../models/client';
import { HttpClient } from '@angular/common/http';
import * as papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class ArchivosCSVService {
  nombreArchivo = 'clients-'+new Date().getTime()+'.csv';
  csvData: any[] = [];
  headerRow: any[] = [];

  constructor(
    //private file: File,
    private toastCtrl: ToastController,
    private http: HttpClient,
    ) { 
  }

  public readCsvData(file: string){
    this.http.get(file)
    .subscribe(
      data => this.extractData(data),
      err => this.handleError(err)
    );
  }

  private extractData(res){
    let csvData = res['_body'] || '';
    let parsedData = papa.parse(csvData).data;
    this.headerRow.push(parsedData[0]);
    console.log('header', this.headerRow);
    parsedData.splice(0,1);
    this.csvData = parsedData;
    console.log('csvData', this.csvData);
  }

  downloadCSV(allRows){
    /*let csv = papa.unparse({
      fields: this.headerRow,
      data: this.csvData
    });*/
    let csv = papa.unparse(allRows);
    // Dummy implementation for Desktop download purpose
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = this.nombreArchivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  private handleError(err) {
    console.log('something went wrong: ', err);
  }
 
  trackByFn(index: any, item: any) {
    return index;
  }

  /*crearArchivoFisico(clientes: Client[]){	
    //esto no está funcionando porque corre en un navegador y no tiene cordova, esto es para mobiles
    console.log('nombre archivo', this.nombreArchivo);
    const arrTemp = [];
    const titulos = 'Id, Agent Id, First Name, Last Name, Gender, Date of Birth, Address, Phone, Alt Phone, Email, Status\n';
    arrTemp.push(titulos);
    
    clientes.forEach( registro =>{
      let localizacion = registro.address;
      const linea = `${registro.id}, ${registro.agentId}, 
      ${registro.lastName}, ${registro.gender}, ${registro.dateOfBirth}, 
      ${localizacion}, ${registro.phone}, 
      ${registro.altphone}, ${registro.email}, ${registro.status},\n`;
      arrTemp.push(linea);
    });
    let text = arrTemp.join('');							
    this.file.checkFile(this.file.dataDirectory, this.nombreArchivo)				
      .then(existe => {										
        console.log('Existe archivo?', existe);							
        return this.escribirEnArchivo(text);							
      }).catch(err => {
        console.log('error checkFile', err);
        return this.file.createFile(this.file.dataDirectory, this.nombreArchivo, false)		
          .then( creado => this.escribirEnArchivo(text))						
          .catch(err2 => console.log('error', err2));				
      });												
  }		

  async escribirEnArchivo(text: string){							
    await this.file.writeExistingFile(this.file.dataDirectory, this.nombreArchivo, text);	
    const archivo = `${this.file.dataDirectory}${this.nombreArchivo}`;
    console.log('Archivo creado', this.file.dataDirectory + this.nombreArchivo);		
  }*/

  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}
