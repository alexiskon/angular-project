import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BugFormModule } from '../app/data-form/bug-form.module'
import { GetDataModule } from '../app/initial-table/get-data.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BugFormModule,
    HttpClientModule,
    GetDataModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
