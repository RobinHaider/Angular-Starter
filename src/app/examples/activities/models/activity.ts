import { PaginationParams } from 'src/app/core/models/pagination';

export class ActivityParams extends PaginationParams {}

export interface ActivityDto {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername: string;
  isCancelled: boolean;
  attendees: AttendeeDto[];
}

export interface AttendeeDto {
  username: string;
  displayName: string;
  bio: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  city: string;
  venue: string;
}
