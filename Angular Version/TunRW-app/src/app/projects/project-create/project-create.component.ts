import { Component, ɵConsole } from '@angular/core';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})


export class ProjectCreateComponent {
  enteredValue = '';
  newProject = 'No Content';

  onAddProject() {
    this.newProject = this.enteredValue;
  }
}
