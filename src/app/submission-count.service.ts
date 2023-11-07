import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubmissionCountService {
  private count = 0;
  private countSubject = new BehaviorSubject<number>(this.count);

  incrementCount() {
    this.count++;
    this.countSubject.next(this.count);
  }

  getCount(): Observable<number> {
    return this.countSubject.asObservable();
  }
}
