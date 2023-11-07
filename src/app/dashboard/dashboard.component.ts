import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import {
  Firestore,
  addDoc,
  collection,
  getDocs,
} from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Import the necessary modules
import {} from 'firebase/firestore';

import { Observable } from 'rxjs';
import { SubmissionCountService } from '../submission-count.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalVisitors: number = 0;

  constructor(
    private firestore: Firestore,
    private submissionCountService: SubmissionCountService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // console.log('Before getting count:', this.submissionCount);
    // this.submissionCount = this.submissionCountService.getCount();
    // console.log('After getting count:', this.submissionCount);
    this.submissionCountService.getCount().subscribe((count) => {
      this.totalVisitors = count;

      // Manually trigger change detection
      this.cd.detectChanges();
    });
  }
}
