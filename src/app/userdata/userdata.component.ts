import { Component } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  getDocs,
  QuerySnapshot,
  doc,
  deleteDoc,
  addDoc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { CounterService } from '../counter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.scss'],
})
export class UserdataComponent {
  userData: any[] = [];
  userIDs: string[] = []; // Array to store unique IDs

  constructor(
    private firestore: Firestore,
    private counterService: CounterService
  ) {
    this.getData();
  }

  async getData() {
    const uCollection = collection(this.firestore, 'bookings');

    const querySnapshot: QuerySnapshot = await getDocs(uCollection);
    querySnapshot.forEach((doc) => {
      // Here, you can filter and extract the data you need from each document
      const data = doc.data();
      const userID = doc.id; // Get the unique ID
      this.userIDs.push(userID); // Store the unique ID
      console.log('Document Data:', data, userID); // Add this line for debugging
      // Add the data to the userData array
      this.userData.push({ id: userID, ...data });
    });
  }

  async cancelBooking(user: any) {
    const originalCollection = collection(this.firestore, 'bookings');
    const cancelledCollection = collection(
      this.firestore,
      'bookings-cancelled'
    );

    try {
      // Ensure user is not empty or undefined
      if (user) {
        const bookingDocRef = doc(originalCollection, user.id);

        // Check if the booking document exists before proceeding
        const bookingSnapshot = await getDoc(bookingDocRef);

        if (bookingSnapshot.exists()) {
          const bookingData = bookingSnapshot.data();

          // Add the booking to the cancelled bookings collection
          const newCancelledDocRef = doc(cancelledCollection);
          await setDoc(newCancelledDocRef, bookingData);

          // Delete the booking from the original collection
          await deleteDoc(bookingDocRef);

          // Update the UI by removing the canceled booking
          this.userData = this.userData.filter((item) => item.id !== user.id);
        }
      } else {
        console.error('Invalid user data');
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
    this.counterService.incrementCancelledCount();
  }
  async approvedBooking(user: any) {
    const originalCollection = collection(this.firestore, 'bookings');
    const cancelledCollection = collection(this.firestore, 'bookings-approved');

    try {
      // Ensure user is not empty or undefined
      if (user) {
        const bookingDocRef = doc(originalCollection, user.id);

        // Check if the booking document exists before proceeding
        const bookingSnapshot = await getDoc(bookingDocRef);

        if (bookingSnapshot.exists()) {
          const bookingData = bookingSnapshot.data();

          // Add the booking to the cancelled bookings collection
          const newCancelledDocRef = doc(cancelledCollection);
          await setDoc(newCancelledDocRef, bookingData);

          // Delete the booking from the original collection
          await deleteDoc(bookingDocRef);

          // Update the UI by removing the canceled booking
          this.userData = this.userData.filter((item) => item.id !== user.id);
        }
      } else {
        console.error('Invalid user data');
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
    this.counterService.incrementApprovedCount();
  }
}
