import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

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

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'admin/Events', component: AdminEventsComponent },
  { path: '', component: OnePageComponent }
];

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
    AdminListEventsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


 }
