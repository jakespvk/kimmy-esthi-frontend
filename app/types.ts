import { UUID } from "crypto";

export interface Appointment {
  id: UUID;
  dateTime: Date;
  status: boolean;
  appointmentType: string;
}
