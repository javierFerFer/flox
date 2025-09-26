import { Component, inject } from '@angular/core';
import { UserStore } from '../../stores/user/user.store';
import { doc, Firestore } from '@angular/fire/firestore';
import { ButtonModule } from 'primeng/button';
import { Auth, signOut } from '@angular/fire/auth';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { RouterModule } from '@angular/router';
import { LateralMenuComponent } from './components/lateral-menu/lateral-menu.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    ButtonModule,
    ToolbarModule,
    AvatarModule,
    AvatarGroupModule,
    RouterModule,
    LateralMenuComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  userStore = inject(UserStore);
  private readonly firestore = inject(Firestore);
  private readonly auth = inject(Auth);
  private readonly userDoc = doc(
    this.firestore,
    `users/${this.userStore.user().uid}`,
  );

  constructor() {
    // setTimeout(() => {
    //   docData(this.userDoc, { idField: 'id' }).subscribe(console.log);
    // }, 3000);
  }

  logout() {
    signOut(this.auth);
  }
}
