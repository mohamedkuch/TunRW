import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnePageComponent } from './onePage/onepage.component';
import { PageNotFoundComponent } from './404/pagenotfound.component';
import { AdminEventsComponent } from './admin/admin-events/admin-events.component';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'admin/Events', component: AdminEventsComponent },
  { path: '', component: OnePageComponent },
  { path: '**', component : PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
    appRoutes,
    { enableTracing: true }) // <-- debugging purposes only
  ],
  exports: [RouterModule]


})
export class AppRoutingModule {}
