import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { ParametrosService } from 'src/app/Services/global/parametros.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo = "";
  @Input() icono = "";
  @Output() clickIcono: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public router:Router,
    public navCtrl:NavController,
    public modalCtrl:ModalController,
    public parametrosService:ParametrosService
  ) { 
  
  }

  ngOnInit() {
    //console.log(this.titulo)
    //console.log(this.icono)
  }

  agregar(){
    //this.router.navigate(['']);
    //console.log('header.agregar');
  }

  click(){
    this.clickIcono.emit();
  //  this.navCtrl.back();  
  }

  /*close(){
    this.clickIcono.emit();
    this.parametrosService.param = "";
    this.modalCtrl.dismiss();
  }*/

}
