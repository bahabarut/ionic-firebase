import { Router } from '@angular/router';
import { FbservisService } from './services/fbservis.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  uye=this.fbservis.AktifUyeBilgi;
  constructor(public fbservis:FbservisService,public router:Router) {}

  OturumKapat(){
    this.fbservis.OturumKapat().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}
