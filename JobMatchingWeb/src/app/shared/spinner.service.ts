import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  spinner: BehaviorSubject<boolean>;


  constructor() {
    this.spinner = new BehaviorSubject(false);
  }

  showSpinner(show: boolean){
    this.spinner.next(show);
  }
}
