import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, lastValueFrom} from 'rxjs';
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
  jobCandidate!: JobCandidate;

  async ngOnInit()  {
    this.jobId = this.activatedRoute.snapshot.params['jobId'];
    this.jobCandidate$ = this.jobService.apiJobMatchedCandidateJobIdGet(this.jobId);
    this.jobCandidate = await lastValueFrom(this.jobCandidate$);
  }

   skillMatched(skill: string) : boolean{

    if(this.jobCandidate.match){
      return this.jobCandidate.job!.skill_Tag!.some(x => x===skill);
    }
    return false;
  }

}
