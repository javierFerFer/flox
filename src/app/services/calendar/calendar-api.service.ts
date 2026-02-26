import { inject, Injectable } from '@angular/core';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { from, map } from 'rxjs';
import { CalendarModel } from '../../stores/calendar/calendar.model';
import { UserStore } from '../../stores/user/user.store';

@Injectable({ providedIn: 'root' })
export class CalendarApiService {
  private readonly firestore = inject(Firestore);
  private readonly userStore = inject(UserStore);

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

  updateCalendarWeeklyInfo(date: string, calendarData: CalendarModel) {
    const calendarDoc = doc(
      this.firestore,
      `calendar/${this.userStore.user().uid}/${date}/calendar_info`,
    );

    return from(
      setDoc(calendarDoc, { calendar_info: calendarData }, { merge: true }),
    ).pipe(map((_) => true));
  }
}
