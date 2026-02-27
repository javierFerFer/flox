export interface CalendarModel {
  date: string;
  calendarData: CalendarData;
}

export interface CalendarGlobalInfo {
  calendarInfo: {
    [key: string]: string;
  };
}

export interface CalendarUserConfig {
  value: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
}

export interface CalendarInnerConfig {
  value: string;
  monday: CalendarInnerElement;
  tuesday: CalendarInnerElement;
  wednesday: CalendarInnerElement;
  thursday: CalendarInnerElement;
  friday: CalendarInnerElement;
}

export interface CalendarInnerElement {
  value: string;
  tag: string;
}

interface CalendarData {
  project?: string;
  proposals?: string;
  materials?: string;
  weeklyTutorials?: string;
  doNotForget?: string;
  tableInfo: CalendarInnerConfig[];
}
