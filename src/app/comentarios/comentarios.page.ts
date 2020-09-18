import { Component, OnInit } from '@angular/core';
import { ComentariosService } from '../Services/comentarios.service';
import { LoadingService } from '../Services/loading.service';
import { Comentario } from '../models/comentario';
import { UsuarioService } from '../Services/usuario.service';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {

  public nuevoComentario = new Comentario();
  public comentarios =[];

  constructor(
    private comentariosService:ComentariosService,
    private loadingService:LoadingService,
    private usuarioService:UsuarioService,
    private modalCtrl:ModalController,
    private navParams:NavParams,
  ) { }

  ngOnInit() {

    if(this.navParams.get('id')){
      this.comentariosService.setPathComentarios(this.navParams.get('id'));
    }
    else{
      alert("id not found");
      this.modalCtrl.dismiss();
    }

    this.loadingService.presentLoading();
    this.comentariosService.list().subscribe(snapshot =>{
      this.loadingService.dismissLoading();
      this.comentarios = snapshot;
    });

  }

  enviar(){
    this.nuevoComentario.agentName = this.usuarioService.getNombre();
    this.nuevoComentario.agentId = this.usuarioService.getUID();   

    const item = JSON.parse(JSON.stringify(this.nuevoComentario)); 

    this.comentariosService.add(item).then(data=>{
      console.log(data);
    })
  }

  clickIcono(){
    this.modalCtrl.dismiss();
  }

}
