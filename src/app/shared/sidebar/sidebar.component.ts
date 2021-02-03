import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  cargando: boolean = false;



  constructor(
    private authSvc: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  logout() {
    this.cargando = true;
    this.authSvc.logout()
    .then( () => {
      this.cargando = false;
      this.router.navigateByUrl('login');
    })
    .catch( error => {
      this.cargando = false;
      console.info(error);
    })
  }
}
