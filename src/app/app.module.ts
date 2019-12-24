import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { TasksComponent } from './tasks/tasks.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { UsersComponent } from './users/users.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { ProjectpipePipe } from './projectpipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    TasksComponent,
    UsersComponent,
    AppHeaderComponent,
    ViewTaskComponent,
    ProjectpipePipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,HttpModule,
    HttpClientModule
  ],
  providers: [ApiService,],
  bootstrap: [AppComponent]
})
export class AppModule { }

