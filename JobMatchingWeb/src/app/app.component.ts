import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SpinnerService } from './shared/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {

  loading = true;
  title = 'JobMatchingWeb';

  currentSpinner: Observable<boolean>;
  subscriptions!: Subscription;

  constructor(private router: Router ,private changeDetector: ChangeDetectorRef , private spinner: SpinnerService)
 {
  this.subscriptions = new Subscription();
  this.currentSpinner = spinner.spinner.asObservable();
}

  ngOnInit() {

    this.subscriptions.add( this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.spinner.showSpinner(true);
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          setTimeout(() => {  this.spinner.showSpinner(false); }, 100);
          break;
        }
        default: {
          break;
        }
      }
    })
    );

    this.subscriptions.add(
    this.currentSpinner.subscribe(x =>{
      this.loading = x;
      this.changeDetector.detectChanges();
      console.log("loading is " +x);
    }
    )
    );
  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
