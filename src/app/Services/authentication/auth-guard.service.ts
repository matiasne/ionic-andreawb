import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    public usuarioService: UsuarioService
      ) {}

  canActivate(): boolean {
    return this.usuarioService.isAuthenticated();
  }
}
