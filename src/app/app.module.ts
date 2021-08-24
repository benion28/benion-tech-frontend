import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './modules/layout/layout.module';
import { HomeModule } from './modules/home/home.module';
import { RouterModule } from '@angular/router';
import { AdminModule } from './modules/admin/admin.module';
import { WorksModule } from './modules/works/works.module';
import { AboutMeModule } from './modules/about-me/about-me.module';
import { NewContactComponent } from './components/new-contact/new-contact.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ContactsModule } from './modules/contacts/contacts.module';
import { ContactsService } from './services/contacts.service';
import { DepartmentsService } from './services/departments.service';
import { DialogService } from './services/dialog.service';
import { NotificationsService } from './services/notifications.service';
import { environment } from '../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NewsService } from './services/news.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { NewLoginUserComponent } from './components/new-login-user/new-login-user.component';
import { NewAdminUserComponent } from './components/new-admin-user/new-admin-user.component';
import { ImagesService } from './services/images.service';
import { MapService } from './services/map.service';
import { NewCoordinateComponent } from './components/new-coordinate/new-coordinate.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    NewContactComponent,
    PageNotFoundComponent,
    NewAdminUserComponent,
    NewLoginUserComponent,
    GoogleMapComponent,
    NewCoordinateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    LayoutModule,
    HomeModule,
    AdminModule,
    WorksModule,
    AboutMeModule,
    ContactsModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AgmCoreModule.forRoot({ apiKey: environment.googleMapAPIKey }),
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    FlexLayoutModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatToolbarModule,
    MatTooltipModule,
    MatListModule,
    MatTabsModule,
    MatProgressBarModule,
    MatExpansionModule
  ],
  providers: [
    ContactsService,
    DepartmentsService,
    DialogService,
    NotificationsService,
    NewsService,
    UsersService,
    ImagesService,
    MapService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialogComponent,
    NewContactComponent,
    NewLoginUserComponent,
    NewAdminUserComponent,
    NewCoordinateComponent
  ]
})
export class AppModule { }
