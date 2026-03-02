import { inject, Injectable } from '@angular/core';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { from, map } from 'rxjs';
import {
  CalendarModel,
  CalendarUserConfig,
} from '../../stores/calendar/calendar.model';
import { UserStore } from '../../stores/user/user.store';

@Injectable({ providedIn: 'root' })
export class CalendarApiService {
  private readonly firestore = inject(Firestore);
  private readonly userStore = inject(UserStore);

  public getCalendarGlobalConfig() {
    const calendarDoc = doc(this.firestore, `calendar/calendar_global_info`);

    return docData(calendarDoc).pipe(
      map((result) => {
        if (!result || !result!['calendar_info']) {
          return undefined;
        }
        return { ...result!['calendar_info'] };
      }),
    );
  }

  public getCalendarUserConfig() {
    const calendarDoc = doc(
      this.firestore,
      `calendar/${this.userStore.user().uid}/user_calendar_config/config`,
    );

    return docData(calendarDoc).pipe(
      map((result) => {
        if (!result || !result!['config']) {
          return undefined;
        }
        return { ...result!['config'] };
      }),
    );
  }

  public getCalendarInfo(date: string) {
    const calendarDoc = doc(
      this.firestore,
      `calendar/${this.userStore.user().uid}/${date}/calendar_info`,
    );

    return docData(calendarDoc).pipe(
      map((result) => {
        if (!result || !result!['calendar_info']) {
          return undefined;
        }
        return { ...result!['calendar_info'] };
      }),
    );
  }

  updateCalendarWeeklyInfo(calendarModel: CalendarModel) {
    const calendarDoc = doc(
      this.firestore,
      `calendar/${this.userStore.user().uid}/${calendarModel.date}/calendar_info`,
    );

    return from(
      setDoc(calendarDoc, { calendar_info: calendarModel }, { merge: true }),
    ).pipe(map((_) => true));
  }

  updateUserCalendarConfig(data: CalendarUserConfig[]) {
    const calendarDoc = doc(
      this.firestore,
      `calendar/${this.userStore.user().uid}/user_calendar_config/config`,
    );

    return from(setDoc(calendarDoc, { config: data }, { merge: true })).pipe(
      map((_) => true),
    );
  }
}
