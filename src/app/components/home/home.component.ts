import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  uye=this.fbservis.AktifUyeBilgi;
  constructor(public fbservis:FbservisService
   
  ) { }

  ngOnInit() {}

}
