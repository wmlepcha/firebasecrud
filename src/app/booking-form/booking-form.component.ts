import { Component } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Import the necessary modules
import {} from 'firebase/firestore';
import { ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs';
import { SubmissionCountService } from '../submission-count.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
})
export class BookingFormComponent {
  bookingForm: FormGroup; // Declare a FormGroup for your form

  constructor(
    private firestore: Firestore,
    private fb: FormBuilder,
    private submissionCountService: SubmissionCountService,
    private cd: ChangeDetectorRef
  ) {
    this.bookingForm = this.fb.group({
      username: ['', Validators.required],
      whatsappNo: ['', Validators.required],
      contactNo: ['', Validators.required],
      nationality: ['', Validators.required],
      cityComingFrom: ['', Validators.required],
      cottage: ['default', Validators.required],
      arrivalDate: ['', Validators.required],
      departureDate: ['', Validators.required],
      nof: ['default', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit() {}

  submitForm() {
    this.submissionCountService.incrementCount();
    if (this.bookingForm.valid) {
      console.log(
        'Count after increment:',
        this.submissionCountService.getCount()
      );
      this.cd.detectChanges();
      const formData = this.bookingForm.value;

      // Create a reference to the Firestore collection
      const collectionRef = collection(this.firestore, 'bookings');

      // Use the addDoc function to add the form data to the collection
      addDoc(collectionRef, formData)
        .then(() => {
          console.log('Document written with ID:');
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });

      this.bookingForm.reset();
    } else {
      // Form is not valid, display an error message for all invalid fields
      Object.keys(this.bookingForm.controls).forEach((controlName) => {
        const control = this.bookingForm.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
