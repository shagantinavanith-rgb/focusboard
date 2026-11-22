import { GridIcon, ListIcon, CalendarIcon, SettingsIcon } from './Icons.jsx';

export const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', shortLabel: 'Overview', Icon: GridIcon },
  { id: 'tasks', label: 'My tasks', shortLabel: 'Tasks', Icon: ListIcon },
  { id: 'calendar', label: 'Calendar', shortLabel: 'Calendar', Icon: CalendarIcon, disabled: true },
  { id: 'settings', label: 'Settings', shortLabel: 'Settings', Icon: SettingsIcon, disabled: true },
];
