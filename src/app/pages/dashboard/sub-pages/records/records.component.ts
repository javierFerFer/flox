import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';
import { RouterLink, RouterOutlet } from '@angular/router';

interface TabsElements {
  value: string | number;
  cssClass?: string;
  title?: string;
  routerLink: string | Object;
}

@Component({
  standalone: true,
  imports: [
    TabsModule,
    CardModule,
    CommonModule,
    TranslocoDirective,
    RouterLink,
    RouterOutlet,
  ],
  selector: 'app-records',
  templateUrl: 'records.component.html',
})
export class RecordsComponent {
  readonly tabListElements: TabsElements[] = [
    {
      value: '',
      cssClass: 'pi pi-plus',
      routerLink: { outlets: { recordsModals: ['create-new-class'] } },
    },
  ];
}
