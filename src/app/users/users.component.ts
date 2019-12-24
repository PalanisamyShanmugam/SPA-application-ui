import { Component, OnInit, Input ,Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from './../api.service';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @Input() showUser: boolean;
  addUser: FormGroup;
  user :any;
  constructor( private formBuilder: FormBuilder, private api: ApiService, @Inject(DOCUMENT) document) {
    this.addUser = this.formBuilder.group({
      fname: '',
      lname: '',
      employee:'',
      serachTask:'',
      efname:'',
      elname:'',
      eid:''
    });
   }

  ngOnInit() {
    this.api.post<any>('/SpringRestfulWebServiceHibernate/getUserDetails/v1').subscribe(user => {
      this.user = user;
},
      rejection => {
          console.log(rejection);
      });
     
    
  }


  AddUser(addUser:FormGroup){
    //console.log(checkoutForm);
    console.log(addUser.get('fname').value);
    console.log(addUser.get('lname').value);
    console.log(addUser.get('employee').value);
     console.log(addUser);
    //this.api.get("/guest/getUiProperties").subscribe();
     this.api.post<any>('/SpringRestfulWebServiceHibernate/addUserInfo/v1',{"first_name":addUser.get('fname').value,"last_name":addUser.get('lname').value,"employee_id":addUser.get('employee').value}).subscribe(user => {
      this.user = user;
      this.addUser = this.formBuilder.group({
        fname: '',
        lname: '',
        employee:'',
        serachTask:'',
        efname:'',
        elname:'',
        eid:''
      });
},
      rejection => {
          console.log(rejection);
      });
     
  }
  reset(addUser:FormGroup){
    this.addUser = this.formBuilder.group({
      fname: '',
      lname: '',
      employee:'',
      serachTask:'',
      efname:'',
      elname:'',
      eid:''
    });
  }

  sortByLName(addUser:FormGroup){
    this.api.post<any>('/SpringRestfulWebServiceHibernate/getSortUserByLastName/v1').subscribe(user => {
      this.user = user;
},
      rejection => {
          console.log(rejection);
      });
  }
  sortByFName(addUser:FormGroup){
    this.api.post<any>('/SpringRestfulWebServiceHibernate/getSortUserByFirstName/v1',{}).subscribe(user => {
      this.user = user;
},
      rejection => {
          console.log(rejection);
      });
  }

  SortById(addUser:FormGroup){
    this.api.post<any>('/SpringRestfulWebServiceHibernate/getSortUserByEmployeeId/v1').subscribe(user => {
      this.user = user;
},
      rejection => {
          console.log(rejection);
      });
  }
  serachTask(addUser:FormGroup){
    //serachTask
    this.api.post<any>('/SpringRestfulWebServiceHibernate/searchUserByFirstLastName/v1',{"first_name":addUser.get('serachTask').value,"last_name":addUser.get('serachTask').value}).subscribe(user => {
      this.user = user;
},
      rejection => {
          console.log(rejection);
      });
  }

  editUser(id){
    //serachTask
    
    console.log(id);
    var fname = (<HTMLInputElement>document.getElementById("fname"+id)).value;
    var lanme=(<HTMLInputElement>document.getElementById("lname"+id)).value;
    var eid=(<HTMLInputElement>document.getElementById("eid"+id)).value;//
    var userId=(<HTMLInputElement>document.getElementById("userId"+id)).value;

      this.api.post<any>('/SpringRestfulWebServiceHibernate/updateUserDetails/v1',{"user_id":userId,"first_name":fname,"last_name":lanme,"employee_id":eid}).subscribe(user => {
        this.user = user;
  },
        rejection => {
           console.log(rejection);
        });
   }

  deleteTask(id){
    //serachTask
    var userId=(<HTMLInputElement>document.getElementById("userId"+id)).value; 
    this.api.post<any>('/SpringRestfulWebServiceHibernate/deleteUserDetails/v1',{"user_id":userId}).subscribe(user => {
      this.user = user;
},
      rejection => {
         console.log(rejection);
      });
   }

}
