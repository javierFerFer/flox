export interface CalendarModel {
  date: string;
  calendarData: CalendarData;
}

interface CalendarData {
  project?: string;
  proposals?: string;
  materials?: string;
  weeklyTutorials?: string;
  doNotForget?: string;
  tableInfo: TableInfo[];
}

export interface TableInfo {
  monday?: string | null;
  tuesday?: string | null;
  wednesday?: string | null;
  thursday?: string | null;
  friday?: string | null;
}
