import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CounterService } from '../counter.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  counterValue: number = 0;

  constructor(public counterService: CounterService) {}

  ngOnInit() {
    this.counterValue = this.counterService.getApprovedCount();
  }
}
