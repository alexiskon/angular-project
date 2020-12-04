import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserStory1Module } from './user-story-1/user-story-1.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { GetDataComponent } from './user-story-1/get-data/get-data.component';
import { UserStory2Module } from './user-story-2/user-story-2.module';
import { BugFormComponent } from './user-story-2/bug-form/bug-form.component';

const routes: Routes = [
  {
    path: '', component: GetDataComponent
  },
  {
    path: 'bug_reporting_form', component: BugFormComponent
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserStory1Module,
    HttpClientModule,
    UserStory2Module,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
