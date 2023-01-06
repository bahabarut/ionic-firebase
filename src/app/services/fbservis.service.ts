import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import {
  collectionData,
  docData,
  Firestore,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
} from '@firebase/auth';
import { addDoc, collection, deleteDoc, doc } from '@firebase/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { Kategori } from '../models/kategori';
import { Uye } from '../models/uye';

@Injectable({
  providedIn: 'root',
})
export class FbservisService {
  aktifUye = authState(this.auth);

  constructor(
    public fs: Firestore,
    public auth: Auth // public storage: Storage,
  ) {}

  FacebookSignUp() {
    var provider = new FacebookAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  KayitOl(mail: string, parola: string) {
    return from(createUserWithEmailAndPassword(this.auth, mail, parola));
  }
  OturumAc(mail: string, parola: string) {
    return from(signInWithEmailAndPassword(this.auth, mail, parola));
  }
  OturumKapat() {
    return from(this.auth.signOut());
  }

  get AktifUyeBilgi() {
    return this.aktifUye.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.fs, 'Uyeler', user?.uid);
        return docData(ref) as Observable<Uye>;
      })
    );
  }

  UyeListele() {
    var ref = collection(this.fs, 'Uyeler');
    return collectionData(ref, { idField: 'uid' }) as Observable<Uye[]>;
  }

  UyeEkle(uye: Uye) {
    var ref = doc(this.fs, 'Uyeler/' + uye.uid);
    return from(setDoc(ref, uye));
  }
  UyeDuzenle(uye: Uye) {
    var ref = doc(this.fs, 'Uyeler/' + uye.uid);
    return from(updateDoc(ref, { ...uye }));
  }
  UyeSil(uye: Uye) {
    var ref = doc(this.fs, 'Uyeler/' + uye.uid);
    return deleteDoc(ref);
  }

  KategoriListele() {
    var ref = collection(this.fs, 'Kategoriler');
    return collectionData(ref, { idField: 'kategoriId' }) as Observable<
      Kategori[]
    >;
  }

  // KategoriById(kategoriId: string) {
  //   var ref = collection(this.fs, 'Kategoriler');
  //   var sorgu = query(ref, where(, '==', kategoriId));
  //   // return doc(ref, { idField: 'uid' }) as Observable<Uye[]>;
  //   return collectionData(sorgu);
  // }

  KategoriEkle(kategori: Kategori) {
    var ref = collection(this.fs, 'Kategoriler');
    return addDoc(ref, { kategoriAdi: kategori.kategoriAdi });
  }

  KategoriDuzenle(kategori: Kategori) {
    var ref = doc(this.fs, 'Kategoriler/' + kategori.kategoriId);
    return updateDoc(ref, { ...kategori });
  }
  KategoriSil(kategori: Kategori) {
    var ref = doc(this.fs, 'Kategoriler/' + kategori.kategoriId);
    return deleteDoc(ref);
  }
}
