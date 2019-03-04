import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TopCoverComponent } from './topcover/topcover.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { EventsComponent } from './events/events.component';
import { ProjectsComponent } from './projects/projects.component';
import { PartnersComponent } from './partners/partners.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent ,
    TopCoverComponent,
    AboutComponent,
    ServicesComponent,
    EventsComponent,
    ProjectsComponent,
    PartnersComponent,
    ContactComponent,
    AdminComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


 }
