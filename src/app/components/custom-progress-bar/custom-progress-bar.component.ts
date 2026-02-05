import { Component } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-custom-progress-bar',
  templateUrl: 'custom-progress-bar.component.html',
  standalone: true,
  imports: [ProgressBarModule],
})
export class CustomProgressBarComponent {
  // need to create a custom pipe for every request to update the state of the requests
  // and consume it here using the store called requestsStore
}
