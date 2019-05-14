import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { OnePageComponent } from './onePage/onepage.component';
import { HeaderComponent } from './onePage/header/header.component';
import { TopCoverComponent } from './onePage/topcover/topcover.component';
import { AboutComponent } from './onePage/about/about.component';
import { ServicesComponent } from './onePage/services/services.component';
import { EventsComponent } from './onePage/events/events.component';
import { ProjectsComponent } from './onePage/projects/projects.component';
import { PartnersComponent } from './onePage/partners/partners.component';
import { ContactComponent } from './onePage/contact/contact.component';

import { AdminComponent } from './admin/admin.component';
import { AdminEventsComponent } from './admin/admin-events/admin-events.component';
import { CreateEventComponent } from './admin/admin-events/create-event/create-event.component';
import { AdminListEventsComponent } from './admin/admin-events/list-event/list-event.component';

import { PageNotFoundComponent } from './404/pagenotfound.component';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressSpinnerModule , MatInputModule, MatPaginatorModule} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    OnePageComponent,
    AppComponent,
    HeaderComponent ,
    TopCoverComponent,
    AboutComponent,
    ServicesComponent,
    EventsComponent,
    ProjectsComponent,
    PartnersComponent,
    ContactComponent,
    AdminComponent,
    AdminEventsComponent,
    CreateEventComponent,
    AdminListEventsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatPaginatorModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


 }
