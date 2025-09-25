import { Component, inject } from '@angular/core';
import { UserStore } from '../../stores/user/user.store';
import { doc, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly firestore = inject(Firestore);
  private readonly userStore = inject(UserStore);
  private readonly userDoc = doc(
    this.firestore,
    `users/${this.userStore.user().uid}`,
  );

  constructor() {
    // setTimeout(() => {
    //   docData(this.userDoc, { idField: 'id' }).subscribe(console.log);
    // }, 3000);
  }
}
