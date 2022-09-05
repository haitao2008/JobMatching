import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {

  loading = true;
  title = 'JobMatchingWeb';
  spinner = new BehaviorSubject(false);
  currentSpinner = this.spinner.asObservable();
  subscriptions!: Subscription;

  constructor(private router: Router ,private changeDetector: ChangeDetectorRef )
 {
  this.subscriptions = new Subscription();

}

  ngOnInit() {

    this.subscriptions.add( this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.spinner.next(true);
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          setTimeout(() => {  this.spinner.next(false); }, 1000);
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
