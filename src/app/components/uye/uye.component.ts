import { HotToastService } from '@ngneat/hot-toast';
import { Observable, switchMap } from 'rxjs';
import { FbservisService } from './../../services/fbservis.service';
import { Uye } from 'src/app/models/uye';
import { Sonuc } from 'src/app/models/sonuc';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-uye',
  templateUrl: './uye.component.html',
  styleUrls: ['./uye.component.scss'],
})
export class UyeComponent implements OnInit {
  uyeler!: Uye[];
  sonuc: Sonuc = new Sonuc();
  uye = this.fbservis.AktifUyeBilgi;

  constructor(
    public fbservis: FbservisService,
    public htoast: HotToastService
  ) {}

  ngOnInit() {
    this.ListeleUye();
  }

  ListeleUye() {
    this.fbservis.UyeListele().subscribe((d) => {
      this.uyeler = d;
    });
  }

  EkleUye(kullaniciadi: any, email: any, tel: any, parola: any, admin: any) {
    this.fbservis
      .KayitOl(email, parola)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.fbservis.UyeEkle({
            uid,
            email,
            tel,
            displayName: kullaniciadi,
            admin,
            parola,
          })
        ),
        this.htoast.observe({
          success: 'Yeni Kayıt Oluşturuldu',
          loading: 'Kayıt Yapılıyor...',
          error: ({ message }) => `Hata => ${message}`,
        })
      )
      .subscribe();
  }

  UyeSil(uye: Uye) {
    this.fbservis.UyeSil(uye).then(() => {});
  }
}
