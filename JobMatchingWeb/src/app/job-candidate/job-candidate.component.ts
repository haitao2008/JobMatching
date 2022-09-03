import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { JobService, JobCandidate} from 'src/libs/api-client';

@Component({
  selector: 'app-job-candidate',
  templateUrl: './job-candidate.component.html',
  styleUrls: ['./job-candidate.component.scss']
})
export class JobCandidateComponent implements OnInit {

  constructor( private activatedRoute:ActivatedRoute,
    private jobService: JobService ) {
    this.jobId = 0;
  }

  jobId: number;
  jobCandidate$!: Observable<JobCandidate>;

  ngOnInit(): void {
    this.jobId = this.activatedRoute.snapshot.params['jobId'];
    this.jobCandidate$ = this.jobService.apiJobMatchedCandidateJobIdGet(this.jobId);
  }

}
