import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuardHome, AuthGuardLogin } from './@shared/guards';

const routes: Routes = [
  {
    path: 'questions',
    canActivate: [AuthGuardLogin],
    loadChildren: () => import('./@home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    canActivate: [AuthGuardHome],
    loadChildren: () => import('./@auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '', redirectTo: 'questions/all', pathMatch: 'full' },
  { path: '**', redirectTo: 'questions/all' },
];

const config: ExtraOptions = {
  useHash: false,
  relativeLinkResolution: 'legacy',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
