import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingFormComponent } from './booking-form/booking-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserdataComponent } from './userdata/userdata.component';
import { SubmissionCountService } from './submission-count.service';
import { CountVisitorsComponent } from './count-visitors/count-visitors.component';
import { CounterService } from './counter.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BookingFormComponent,

    UserdataComponent,
    CountVisitorsComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [CounterService],

  bootstrap: [AppComponent],
})
export class AppModule {}
