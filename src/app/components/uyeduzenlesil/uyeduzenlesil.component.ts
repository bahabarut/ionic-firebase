import { Uye } from './../../models/uye';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kategori } from 'src/app/models/kategori';
import { Sonuc } from 'src/app/models/sonuc';

@Component({
  selector: 'app-uyeduzenlesil',
  templateUrl: './uyeduzenlesil.component.html',
  styleUrls: ['./uyeduzenlesil.component.scss'],
})
export class UyeduzenlesilComponent implements OnInit {
  _uyeId!: number;
  islem!: string;
  // secUye: Uye = new Uye();
  uyeSonuc: Sonuc = new Sonuc();
  uyeler!: Uye[];
  constructor( public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      this._uyeId = p.uid;
      this.islem = p.islem;

    });

  }

  // UyeListele() {
  //   this.dataServis.UyeListele().subscribe((d) => {
  //     this.uyeler = d;
  //   });
  // }

  

 
}
