import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: 'home',
    component: LayoutComponent,
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: 'works',
    component: LayoutComponent,
    loadChildren: './modules/works/works.module#WorksModule'
  },
  {
    path: 'contacts',
    component: LayoutComponent,
    loadChildren: './modules/contacts/contacts.module#ContactsModule'
  },
  {
    path: 'about-me',
    component: LayoutComponent,
    loadChildren: './modules/about-me/about-me.module#AboutMeModule'
  },
  {
    path: 'benion-admin',
    component: LayoutComponent,
    loadChildren: './modules/admin/admin.module#AdminModule'
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
    data: { title: 'Benion Page Not Found' }
  },
  {
    path: 'google-map',
    component: GoogleMapComponent,
    data: { title: 'Benion Google Map' }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
