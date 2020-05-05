import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorksComponent } from 'src/app/components/works/works.component';


const routes: Routes = [
  {
    path: '',
    component: WorksComponent,
    data: { title: 'Benion Works' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorksRoutingModule { }
