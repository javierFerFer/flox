import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { CardModule } from 'primeng/card';
import { TabList, TabsModule } from 'primeng/tabs';
import { ClassStore } from '../../../../stores/class/class.store';

interface TabsElements {
  value: string | number;
  cssClass?: string;
  title?: string;
  routerLink: string | Object;
  keyToTranslate?: string;
}

@Component({
  standalone: true,
  imports: [
    TabsModule,
    CardModule,
    CommonModule,
    RouterLink,
    RouterOutlet,
    TranslocoDirective,
  ],
  selector: 'app-records',
  templateUrl: 'records.component.html',
})
export class RecordsComponent {
  @ViewChild('tabListRef') tabListRef!: TabList;
  classStore = inject(ClassStore);

  readonly lastElementOfTheTabs: TabsElements[] = [
    {
      value: '',
      title: '',
      cssClass: 'pi pi-plus',
      routerLink: { outlets: { recordsModals: ['create-new-class'] } },
      keyToTranslate: 'DASHBOARD.RECORDS.COMPONENTS.CREATE_NEW_CLASS_BUTTON',
    },
  ];

  readonly tabListElements = computed(() => {
    const tabsElements = this.classStore.classes();
    return tabsElements
      .map((classObject) => {
        return {
          value: classObject.uuid,
          title: classObject.name,
          routerLink: { outlets: { classTable: ['class', classObject.uuid] } },
        } as TabsElements;
      })
      .concat(this.lastElementOfTheTabs);
  });

  private readonly tabButtonUpdateEffect = effect(() => {
    this.tabListElements();
    if (this?.tabListRef?.updateButtonState) {
      this.tabListRef.updateButtonState();
    }
  });
}
