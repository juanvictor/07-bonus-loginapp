import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(
    private auth: AuthService,
    private router: RouterModule
  ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  login( form: NgForm ) {
    if ( form.invalid ) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login( this.usuario )
    .subscribe( resp => {
      console.log(resp);

      Swal.close();

      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error.error.message);

      Swal.fire({
        icon: 'error',
        title: 'Error al autentificar',
        text: err.error.error.message
      });
    });

    // console.log('Imprimir SI el formulario es válido');
    // console.log(this.usuario);
    // console.log(form);
  }

}
