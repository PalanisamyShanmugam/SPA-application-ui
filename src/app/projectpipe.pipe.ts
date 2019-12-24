import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'projectpipe'
})
export class ProjectpipePipe implements PipeTransform {

  transform(projects: any, searchProject: string): Array<any> {
    return projects.filter(project => project.project === searchProject);
}
}


