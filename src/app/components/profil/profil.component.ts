import { HotToastService } from '@ngneat/hot-toast';
import { FbservisService } from 'src/app/services/fbservis.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  frm: FormGroup = new FormGroup({
    admin: new FormControl(),
    displayName: new FormControl(),
    email: new FormControl(),
    parola: new FormControl(),
    tel: new FormControl(),
    uid: new FormControl(),
  });
  constructor(
    public fbservis: FbservisService,
    public htoast: HotToastService
  ) {}

  ngOnInit() {
    this.fbservis.AktifUyeBilgi.subscribe((user) => {
      this.frm.patchValue({ ...user });
    });
  }

  Guncelle() {
    this.fbservis.UyeDuzenle(this.frm.value).pipe(
      this.htoast.observe({
        loading: 'Güncelleniyor',
        success: 'Güncellendi',
        error: ({ message }) => `Hata Var => ${message}`,
      })
    ).subscribe();
  }
}
