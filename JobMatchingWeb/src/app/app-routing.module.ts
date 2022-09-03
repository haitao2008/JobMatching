import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobCandidateComponent } from './job-candidate/job-candidate.component';
import { JobListComponent } from './job-list/job-list.component';

const routes: Routes = [
  { path: '', component: JobListComponent },
  { path: 'app-job-list', component: JobListComponent },
  { path: 'app-job-candidate/:jobId', component: JobCandidateComponent },
  { path: '**', component: JobListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
