import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnePageComponent } from './onePage/onepage.component';
import { PageNotFoundComponent } from './404/pagenotfound.component';
import { AdminEventsComponent } from './admin/admin-events/admin-events.component';
import { AdminComponent } from './admin/admin.component';
import { CreateEventComponent } from './admin/admin-events/create-event/create-event.component';
import { LoginComponent } from './admin/auth/login/login.component';
import { MembersAdminComponent } from './admin/admin-members/admin-members.component';
import { CreateMemberComponent } from './admin/admin-members/create-member/create-member.component';

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/Events', component: AdminEventsComponent },
  { path: 'admin/Members', component: MembersAdminComponent },
  { path: 'admin/Members/create', component: CreateMemberComponent },
  { path: 'admin/Events/create', component: CreateEventComponent },
  { path: 'admin/Events/edit/:eventId', component: CreateEventComponent },
  { path: '', component: OnePageComponent },
  { path: '**', component : PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
    appRoutes,
    { enableTracing: false }) // <-- debugging purposes only
  ],
  exports: [RouterModule]


})
export class AppRoutingModule {}
