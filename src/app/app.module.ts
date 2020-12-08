import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserStory1Module } from './user-story-1/user-story-1.module';
import { HttpClientModule } from '@angular/common/http';
import { UserStory2Module } from './user-story-2/user-story-2.module';



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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
