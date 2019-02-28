import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TopCoverComponent } from './topcover/topcover.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { EventsComponent } from './events/events.component';
import { ProjectsComponent } from './projects/projects.component';
import { PartnersComponent } from './partners/partners.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent ,
    TopCoverComponent,
    AboutComponent,
    ServicesComponent,
    EventsComponent,
    ProjectsComponent,
    PartnersComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
