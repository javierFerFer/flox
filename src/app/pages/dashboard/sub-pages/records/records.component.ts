import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  effect,
  ViewChild,
} from '@angular/core';
import { TabList, TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ClassStore } from '../../../../stores/class/class.store';
import { TranslocoDirective } from '@jsverse/transloco';

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
  changeDetection: ChangeDetectionStrategy.Default,
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
          // @TODO: pending this
          routerLink: { outlets: { recordsModals: ['create-new-class'] } },
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
