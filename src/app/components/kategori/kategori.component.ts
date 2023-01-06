import { FormGroup, FormControl } from '@angular/forms';
import { Sonuc } from './../../models/sonuc';
import { HotToastService } from '@ngneat/hot-toast';
import { FbservisService } from './../../services/fbservis.service';
import { Kategori } from './../../models/kategori';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.scss'],
})
export class KategoriComponent implements OnInit {
  kategoriler!: Kategori[];
  frm: FormGroup = new FormGroup({
    kategoriAdi: new FormControl(),
    kategoriId: new FormControl(),
  });

  constructor(
    public fbservis: FbservisService,
    public htoast: HotToastService
  ) {}

  ngOnInit() {
    this.KatListele();
  }

  Kaydet() {
    var yeni = this.frm.value;
    console.log(yeni);
    this.fbservis.KategoriEkle(yeni).then(() => {
      alert('Kategori Eklendi');
    });
  }

  KatListele() {
    this.fbservis.KategoriListele().subscribe((d) => {
      this.kategoriler = d;
    });
  }

  KatSil(kategori: Kategori) {
    this.fbservis.KategoriSil(kategori).then(() => {});
  }
}
