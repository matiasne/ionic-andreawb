import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { ToastService } from './toast.service';
import { BaseCRUDService } from './base-crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService extends BaseCRUDService{

  constructor(
    public httpClient: HttpClient,
    public usuarioService:UsuarioService,
    public toastService:ToastService
  ) { 
    
    super(httpClient,usuarioService,toastService);
    this.setEndpoint("clients");
  }

}