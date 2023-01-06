import { FbservisService } from './../../services/fbservis.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { FacebookAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    public fbservis: FbservisService,
    public router: Router,
    public htoast: HotToastService
  ) {}

  ngOnInit() {}

  UyeOl(kullaniciadi: any, email: any, parola: any) {
    this.fbservis
      .KayitOl(email, parola)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.fbservis.UyeEkle({ uid, email, displayName: kullaniciadi })
        ),
        this.htoast.observe({
          success: 'Yeni Kayıt Oluşturuldu',
          loading: 'Kayıt Yapılıyor...',
          error: 'hata var',
        })
      )
      .subscribe(() => {
        alert('Hoş Geldiniz (Uye Ol)');
        this.router.navigate(['']);
      });
  }

  FacebookUye() {
    this.fbservis.FacebookSignUp().subscribe((resutl) => {
      const user = resutl.user;
      const credential = FacebookAuthProvider.credentialFromResult(resutl);
      const accessTOken = credential?.accessToken;
    });
  }
}
