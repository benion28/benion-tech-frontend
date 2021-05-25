import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomepageComponent } from 'src/app/components/admin-homepage/admin-homepage.component';
import { AdminContactsComponent } from 'src/app/components/admin-contacts/admin-contacts.component';
import { AdminNewsComponent } from 'src/app/components/admin-news/admin-news.component';
import { AdminUsersComponent } from 'src/app/components/admin-users/admin-users.component';
import { AdminImageGalleryComponent } from 'src/app/components/admin-image-gallery/admin-image-gallery.component';
import { AdminMapComponent } from 'src/app/components/admin-map/admin-map.component';


const routes: Routes = [
  {
    path: '',
    component: AdminHomepageComponent,
    data: { title: 'Benion Admin Homepage' }
  },
  {
    path: 'admin-news',
    component: AdminNewsComponent,
    data: { title: 'Benion Admin News' }
  },
  {
    path: 'admin-contacts',
    component: AdminContactsComponent,
    data: { title: 'Benion Admin Contacts' }
  },
  {
    path: 'admin-users',
    component: AdminUsersComponent,
    data: { title: 'Benion Admin Users' }
  },
  {
    path: 'admin-image-gallery',
    component: AdminImageGalleryComponent,
    data: { title: 'Benion Image Gallery' }
  },
  {
    path: 'admin-google-map',
    component: AdminMapComponent,
    data: { title: 'Benion Google Map' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
