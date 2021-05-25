import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMeComponent } from 'src/app/components/about-me/about-me.component';


const routes: Routes = [
  {
    path: '',
    component: AboutMeComponent,
    data: { title: 'About Benion' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutMeRoutingModule { }
