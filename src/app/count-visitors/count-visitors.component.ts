import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { SubmissionCountService } from '../submission-count.service';

@Component({
  selector: 'app-count-visitors',
  templateUrl: './count-visitors.component.html',
  styleUrls: ['./count-visitors.component.scss'],
})
export class CountVisitorsComponent {
  bookingCancelledCount: number = 0;
  bookingConfirmedCount: number = 0;

  constructor(private firestore: Firestore) {}
}
