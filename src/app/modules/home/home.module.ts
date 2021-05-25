import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMarqueeModule } from 'ng-marquee';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AngularComponent } from 'src/app/components/angular/angular.component';
import { RouterModule } from '@angular/router';
import { HomeImagesComponent } from 'src/app/components/home-images/home-images.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    AngularComponent,
    HomeComponent,
    HomeImagesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    NgMarqueeModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    FlexLayoutModule
  ]
})
export class HomeModule { }
