import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

export abstract class AsyncComponent implements OnDestroy {
  protected ngUnsubscribe = new Subject<void>();

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
