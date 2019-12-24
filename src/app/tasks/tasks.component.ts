import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Input() showTask: boolean;
  addTask: FormGroup;
  parentFlag: any;;
  tasks :any;
  projects : any;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.parentFlag = false;
  
    this.addTask = this.formBuilder.group({
      listProject: '',
      tPriority: '',
      task:'',
      sDate:'',
      eDate:'',
      status:'',
      parentTask:'',
      parentTaskChk:'',
      listProjectid:'',
      parent_id:''
    });
   
  }

  AddTask(addTask:FormGroup){
    //{"parent_id":1,"project_id":1,"task":"task3","start_date":"2019-05-01","end_date":"2019-12-31","priority":5,"status":"Open"}
    
    if(!this.addTask.get('parentTaskChk').value){
      this.taskSevice();
    }else{
      this.addParentTask();
    }
  }
  reset(addTask:FormGroup){

  }

  parentTaskChk(){
    console.log(this.addTask.get('parentTaskChk').value);
    if(!this.addTask.get('parentTaskChk').value){
      this.parentFlag = false;
    }else{
      this.parentFlag = true;
    }
  }

taskSevice(){
  this.api.post<any>('/SpringRestfulWebServiceHibernate/addTaskInfo/v1',{"parent_id":this.addTask.get('parent_id').value,"project_id":this.addTask.get('listProjectid').value,"task":this.addTask.get('task').value,"start_date":this.addTask.get('sDate').value,"end_date":this.addTask.get('eDate').value,"priority":this.addTask.get('tPriority').value,"status":"Open"}).subscribe(tasks => {
    this.tasks = tasks;
},
    rejection => {
        console.log(rejection);
    });
}
  
addParentTask(){
  this.api.post<any>('/SpringRestfulWebServiceHibernate/addParentInfo/v1',{"parent_task":this.addTask.get('task').value}).subscribe(tasks => {
    this.tasks = tasks;
},
    rejection => {
        console.log(rejection);
    });
}

searchProject(addTask:FormGroup){
  this.api.post<any>('/SpringRestfulWebServiceHibernate/getProjectDetailsByProject/v1',{ "project" : this.addTask.get('listProject').value}).subscribe(projects => {
    this.projects = projects;

    this.addTask = this.formBuilder.group({
      listProject: this.projects.projectInfo[0].project,
      tPriority: '',
      task:'',
      sDate:'',
      eDate:'',
      status:'',
      parentTask:'',
      parentTaskChk:'',
      listProjectid:this.projects.projectInfo[0].project_id,
      parent_id:''
    });
},
      rejection => {
          console.log(rejection);
      });
}
searchParent(addTask: FormGroup){

  this.api.post<any>('/SpringRestfulWebServiceHibernate/getParentDetailsByTask/v1',{ "parent_task" : this.addTask.get('parentTask').value}).subscribe(parent => {
    
    this.addTask = this.formBuilder.group({
      listProject: this.addTask.get('listProject').value,
      tPriority: '',
      task:this.addTask.get('task').value,
      sDate:'',
      eDate:'',
      status:'',
      parentTask: parent.parentInfo[0].parent_task,
      parentTaskChk:'',
      listProjectid:this.addTask.get('listProjectid').value,
      parent_id :parent.parentInfo[0].parent_id
    });
},
      rejection => {
          console.log(rejection);
      });

}

}