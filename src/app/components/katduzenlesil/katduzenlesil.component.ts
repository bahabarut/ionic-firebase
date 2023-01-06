import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kategori } from 'src/app/models/kategori';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-katduzenlesil',
  templateUrl: './katduzenlesil.component.html',
  styleUrls: ['./katduzenlesil.component.scss'],
})
export class KatduzenlesilComponent implements OnInit {
  kategoriId!: string;
  islem!: string;
  kategoriler!: Kategori[];
  secKategori!: Kategori;
  constructor(public route: ActivatedRoute, public fbservis: FbservisService) {}

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      this.kategoriId = p.id;
      this.islem = p.islem;
      console.log(this.kategoriId);
      console.log(this.islem);
    });
  }
}
