// // counter.service.ts
// import { Injectable } from '@angular/core';
// import { Firestore } from '@angular/fire/firestore';

// @Injectable({
//   providedIn: 'root',
// })
// export class CounterService {
//   private approvedCount: number = 0;
//   private cancelledCount: number = 0;
//   private totalCount: number = 0;

//   private readonly countsCollection = this.firestore
//     .collection('counts')
//     .doc('counts');

//   constructor(private firestore: Firestore) {
//     // Read counts from Firestore on service initialization
//     this.readCountsFromFirestore();
//   }

//   getApprovedCount(): number {
//     return this.approvedCount;
//   }
//   getTotalCount(): number {
//     return this.totalCount;
//   }

//   getCancelledCount(): number {
//     return this.cancelledCount;
//   }

//   incrementApprovedCount(): void {
//     this.approvedCount++;
//     this.saveCountsToFirestore();
//   }

//   incrementCancelledCount(): void {
//     this.cancelledCount++;
//     this.saveCountsToFirestore();
//   }
//    // Save counts to Firestore
//    private saveCountsToFirestore(): void {
//     this.countsCollection.set({
//       approvedCount: this.approvedCount,
//       cancelledCount: this.cancelledCount,
//       totalCount: this.totalCount,
//     });
// }
// counter.service.ts
// counter.service.ts
// counter.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  setDoc,
  DocumentReference,
  DocumentData,
  getDoc,
} from '@angular/fire/firestore'; // Import Firestore from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private approvedCount: number = 0;
  private cancelledCount: number = 0;
  private totalCount: number = 0;

  private readonly countsCollectionRef: DocumentReference<DocumentData>;

  constructor(private firestore: Firestore) {
    // Set the reference to the 'counts' document within the 'counts' collection
    this.countsCollectionRef = doc(firestore, 'counts', 'counts');

    // Read counts from Firestore on service initialization
    this.readCountsFromFirestore();
  }

  getApprovedCount(): number {
    return this.approvedCount;
  }

  getCancelledCount(): number {
    return this.cancelledCount;
  }

  getTotalCount(): number {
    return this.totalCount;
  }

  incrementApprovedCount(): void {
    this.approvedCount++;
    this.totalCount++;
    // Save counts to Firestore after each increment
    this.saveCountsToFirestore();
  }

  incrementCancelledCount(): void {
    this.cancelledCount++;
    this.totalCount++;
    // Save counts to Firestore after each increment
    this.saveCountsToFirestore();
  }

  // Save counts to Firestore
  private async saveCountsToFirestore(): Promise<void> {
    try {
      await setDoc(this.countsCollectionRef, {
        approvedCount: this.approvedCount,
        cancelledCount: this.cancelledCount,
        totalCount: this.totalCount,
      });
    } catch (error) {
      console.error('Error saving counts to Firestore:', error);
    }
  }

  // Read counts from Firestore
  private async readCountsFromFirestore(): Promise<void> {
    try {
      const docSnapshot = await getDoc(this.countsCollectionRef);
      if (docSnapshot.exists()) {
        const counts = docSnapshot.data();
        this.approvedCount = counts?.['approvedCount'] || 0;
        this.cancelledCount = counts?.['cancelledCount'] || 0;
        this.totalCount = counts?.['totalCount'] || 0;
      }
    } catch (error) {
      console.error('Error reading counts from Firestore:', error);
    }
  }
}
