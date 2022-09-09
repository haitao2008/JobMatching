import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobCandidateComponent } from './job-candidate/job-candidate.component';
import { HttpEventInterceptor } from './shared/http-event.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    JobListComponent,
    JobCandidateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpEventInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
