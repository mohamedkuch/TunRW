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
import { AuthGuard } from './admin/auth/auth.guard';
import { AdminProjectsComponent } from './admin/admin-projects/admin-projects.component';
import { CreateProjectComponent } from './admin/admin-projects/ceate-project/create-project.component';
import { AdminPartnersComponent } from './admin/admin-partners/admin-partners.component';

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'admin/**', component: LoginComponent },

  { path: 'admin/Events', component: AdminEventsComponent, canActivate: [AuthGuard] },
  { path: 'admin/Events/create', component: CreateEventComponent, canActivate: [AuthGuard] },
  { path: 'admin/Events/edit/:eventId', component: CreateEventComponent, canActivate: [AuthGuard] },

  { path: 'admin/Projects', component: AdminProjectsComponent, canActivate: [AuthGuard] },
  { path: 'admin/Projects/create', component: CreateProjectComponent, canActivate: [AuthGuard] },
  { path: 'admin/Projects/edit/:projectId', component: CreateProjectComponent, canActivate: [AuthGuard] },

  { path: 'admin/Partners', component: AdminPartnersComponent, canActivate: [AuthGuard] },

  { path: 'admin/Members', component: MembersAdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/Members/create', component: CreateMemberComponent, canActivate: [AuthGuard] },

  { path: '', component: OnePageComponent },
  { path: '**', component : PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
    appRoutes,
    { enableTracing: false }) // <-- debugging purposes only
  ],
  exports: [RouterModule],
  providers: [AuthGuard]


})
export class AppRoutingModule {}
