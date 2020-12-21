import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BugTableModule } from './bug-table/bug-table.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateEditFormModule } from './create-edit-form/create-edit-form.module';
import { FooterModule } from './footer/footer.module';
import { NotFoundPageModule } from './not-found-page/not-found-page.module';
import { AuthInterceptor } from './services/auth.interceptor';


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
    FooterModule,
    NotFoundPageModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
