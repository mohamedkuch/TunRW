import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from 'src/app/admin/admin-projects/projects.service';
import { Project } from 'src/app/admin/admin-projects/projects.modal';
import { Subscription } from 'rxjs';

@Component({
  selector : 'app-projects',
  templateUrl : './projects.component.html',
  styleUrls : ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy{
  projects: Project[] = [];
  private projectsSub: Subscription;
  postsPerPage = 2;
  currentPage = 1;
  totalProjects = 0;
  isLoading = false;

  constructor(public projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.projectService.getProject(this.postsPerPage, this.currentPage);
    this.projectsSub = this.projectService.getProjectUpdateListener()
      .subscribe(
        (projectData:{ projects : Project[] ,postCount : number } ) => {
          this.isLoading = false;
          this.totalProjects = projectData.postCount;
          this.projects = projectData.projects;
        });
  }

  ngOnDestroy(): void {
    this.projectsSub.unsubscribe();
  }

}
