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

interface TableInfo {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
}
