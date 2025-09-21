import { UUID } from "crypto";

export interface AppointmentDateTime {
  date: string;
  time: string;
}

export interface Appointment {
  id: UUID;
  dateTime: Date;
  status: boolean;
}
