import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { RouterModule } from '@angular/router';
import { LateralMenuComponent } from './components/lateral-menu/lateral-menu.component';
import { CustomMenuBarComponent } from './components/custom-toolbar/custom-menu-bar.component';
import { ToastModule } from 'primeng/toast';

import { CustomBreadCrumbComponent } from './components/custom-breadcrumb/custom-breadcrumb.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    ButtonModule,
    RouterModule,
    LateralMenuComponent,
    CustomMenuBarComponent,
    ToastModule,
    CustomBreadCrumbComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
