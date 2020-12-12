import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BugTableModule } from './bug-table/bug-table.module';
import { HttpClientModule } from '@angular/common/http';
import { CreateEditFormModule } from './create-edit-form/create-edit-form.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BugTableModule,
    HttpClientModule,
    CreateEditFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
