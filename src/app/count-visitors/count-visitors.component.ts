import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { SubmissionCountService } from '../submission-count.service';

@Component({
  selector: 'app-count-visitors',
  templateUrl: './count-visitors.component.html',
  styleUrls: ['./count-visitors.component.scss'],
})
export class CountVisitorsComponent implements OnInit {
  totalConfirmedUsers: number = 0;
  totalCancelledUsers: number = 0;
  totalVisitors: number = 0; // Initialize with your service count

  constructor(
    private firestore: Firestore,
    private submissionCountService: SubmissionCountService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Count the number of users in the 'bookingconfirmed' collection
    const confirmedCollectionRef = collection(
      this.firestore,
      'bookings-confirmed'
    );
    getDocs(confirmedCollectionRef).then((snapshot) => {
      this.totalConfirmedUsers = snapshot.size;
      console.log('Confirmed Users:', this.totalConfirmedUsers); //
      this.cd.detectChanges();
    });

    // Count the number of users in the 'bookingcancelled' collection
    const cancelledCollectionRef = collection(
      this.firestore,
      'bookings-cancelled'
    );
    getDocs(cancelledCollectionRef).then((snapshot) => {
      this.totalCancelledUsers = snapshot.size;
      this.cd.detectChanges();
    });

    // Get the total visitors count from your service
    this.submissionCountService.getCount().subscribe((count) => {
      this.totalVisitors = count;

      // Manually trigger change detection
      this.cd.detectChanges();
    });
  }
}
