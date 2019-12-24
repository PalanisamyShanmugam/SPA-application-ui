import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from './../api.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() showProject: boolean;
  
  checkoutForm: FormGroup;
  projects :any;
  seachValue :string;
  constructor( private formBuilder: FormBuilder, private api: ApiService) { 
    this.checkoutForm = this.formBuilder.group({
      project: '',
      startdate: '',
      enddate:'',
      Priority:'',
      Manager:'',
      serachProject:''
    });
    
  }

  ngOnInit() {
    this.api.post<any>('/SpringRestfulWebServiceHibernate/getProjectInfo/v1').subscribe(projects => {
      this.projects = projects;
},
      rejection => {
          console.log(rejection);
      });
     
  }

  AddProject(checkoutForm:FormGroup){
    //console.log(checkoutForm);
    console.log(checkoutForm.get('project').value);
    console.log(checkoutForm.get('startdate').value);
    console.log(checkoutForm.get('enddate').value);
    console.log(checkoutForm.get('Priority').value);
    console.log(checkoutForm.get('Manager').value);
    console.log(checkoutForm);
    //this.api.get("/guest/getUiProperties").subscribe();
     this.api.post<any>('/SpringRestfulWebServiceHibernate/addProjectInfo/v1',{"project" : checkoutForm.get('project').value,"start_date" : checkoutForm.get('startdate').value,"end_date" : checkoutForm.get('enddate').value,"priority" : checkoutForm.get('Priority').value?checkoutForm.get('Priority').value:0}).subscribe(projects => {
      this.projects = projects;
},
      rejection => {
          console.log(rejection);
      });
     
  }

  sortByStartDate(){
    this.api.post<any>('/SpringRestfulWebServiceHibernate/getSortProjectByStartDate/v1').subscribe(projects => {
      this.projects = projects;
        },
      rejection => {
          console.log(rejection);
      });     
  }

  sortByCompleted(){
    this.api.post<any>('/SpringRestfulWebServiceHibernate/getSortProjectByStartDate/v1').subscribe(projects => {
      this.projects = projects;
        },
      rejection => {
          console.log(rejection);
      });     
  }

  sortByEndDate(){
    this.api.post<any>('/SpringRestfulWebServiceHibernate/getSortProjectByEndDate/v1').subscribe(projects => {
      this.projects = projects;
        },
      rejection => {
          console.log(rejection);
      });     
  }

  sortByPriority(){
    this.api.post<any>('/SpringRestfulWebServiceHibernate/getSortProjectByPriority/v1').subscribe(projects => {
      this.projects = projects;
        },
      rejection => {
          console.log(rejection);
      });     
  }

  reset(){
    this.checkoutForm.reset();
  }

  searchValue(){
        this.api.post<any>('/SpringRestfulWebServiceHibernate/getProjectDetailsByProject/v1',{ "project" : this.checkoutForm.get('serachProject').value}).subscribe(projects => {
    this.projects = projects;
},
      rejection => {
          console.log(rejection);
      });
  }

}
