import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  @Input() showVTask: boolean;
  tasks :any;
  projects:any;
  viewTask:FormGroup;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.viewTask = this.formBuilder.group({
      searchProject: ''}
    );
    this.api.post<any>('/SpringRestfulWebServiceHibernate/getTaskInfo/v1').subscribe(tasks => {
      this.tasks = tasks;
},
      rejection => {
          console.log(rejection);
      });
  }
searchproject(){
  this.api.post<any>('/SpringRestfulWebServiceHibernate/getTaskDetailsByProject/v1',{ "task" : this.viewTask.get('searchProject').value}).subscribe(tasks => {
    this.tasks = tasks;
  });
}
getSortTaskByEndDate(viewTask: FormGroup){
    this.api.post<any>('/SpringRestfulWebServiceHibernate/getSortTaskByEndDate/v1').subscribe(tasks => {
      this.tasks = tasks;
},
      rejection => {
          console.log(rejection);
      });
  }

  getSortTaskByStartDate(viewTask: FormGroup){
    this.api.post<any>('/SpringRestfulWebServiceHibernate/getSortTaskByStartDate/v1').subscribe(tasks => {
      this.tasks = tasks;
},
      rejection => {
          console.log(rejection);
      });
  }

  getSortTaskByPriority(viewTask: FormGroup){
    this.api.post<any>('/SpringRestfulWebServiceHibernate/getSortTaskByPriority/v1').subscribe(tasks => {
      this.tasks = tasks;
},
      rejection => {
          console.log(rejection);
      });
  }

  getSortTaskByCompletedStatus(viewTask: FormGroup){
    this.api.post<any>('/SpringRestfulWebServiceHibernate/getSortTaskByCompletedStatus/v1').subscribe(tasks => {
      this.tasks = tasks;
},
      rejection => {
          console.log(rejection);
      });
  }

  deleteTaskDetails(deltaskID:string){
    this.api.post<any>('/SpringRestfulWebServiceHibernate/deleteTaskDetails/v1',{"task_id" : deltaskID}).subscribe(tasks => {
      this.tasks = tasks;
},
      rejection => {
          console.log(rejection);
      });
    }
}
