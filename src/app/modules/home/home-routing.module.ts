import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AngularComponent } from 'src/app/components/angular/angular.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {  title: 'Benion Homepage' }
  },
  {
    path: 'angular',
    component: AngularComponent,
    data: {  title: 'Benion Angular Demo Page' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
