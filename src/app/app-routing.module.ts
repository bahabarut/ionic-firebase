import { ProfilComponent } from './components/profil/profil.component';
import { SignupComponent } from './components/signup/signup.component';
import { UyeduzenlesilComponent } from './components/uyeduzenlesil/uyeduzenlesil.component';
import { KatduzenlesilComponent } from './components/katduzenlesil/katduzenlesil.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UyeComponent } from './components/uye/uye.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes,
  CanActivate,
} from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'kategoriler',
    component: KategoriComponent
  },
  { path: 'uyeler', component: UyeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'katduzenlesil/:id/:islem', component: KatduzenlesilComponent },
  { path: 'uyeduzenlesil/:uid/:islem', component: UyeduzenlesilComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
