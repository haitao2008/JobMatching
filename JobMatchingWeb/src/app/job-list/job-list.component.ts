import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Job,JobService} from 'src/libs/api-client'

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  constructor(private jobService: JobService) { }

  jobs$!: Observable<Job[]>;

  ngOnInit(): void {
    this.jobs$ = this.jobService.apiJobGet();
  }

}
