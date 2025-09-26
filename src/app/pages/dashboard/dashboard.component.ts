import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ButtonModule } from 'primeng/button';
import { Auth, signOut } from '@angular/fire/auth';

import { RouterModule } from '@angular/router';
import { LateralMenuComponent } from './components/lateral-menu/lateral-menu.component';
import { CustomToolbarComponent } from './components/custom-toolbar/custom-toolbar.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    ButtonModule,
    RouterModule,
    LateralMenuComponent,
    CustomToolbarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly firestore = inject(Firestore);
  private readonly auth = inject(Auth);
  // private readonly userDoc = doc(
  //   this.firestore,
  //   `users/${this.userStore.user().uid}`,
  // );

  constructor() {
    // setTimeout(() => {
    //   docData(this.userDoc, { idField: 'id' }).subscribe(console.log);
    // }, 3000);
  }

  logout() {
    signOut(this.auth);
  }
}
