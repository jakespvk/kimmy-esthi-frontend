export interface Appointment {
  id?: string;
  dateTime: string;
  status: boolean;
  appointmentType?: string;
  scheduledAppointment?: ScheduledAppointment;
}

export interface AdminAppointment {
  id?: string;
  dateTime: string;
  date?: string;
  time?: string
  status: boolean;
  appointmentType?: string;
  scheduledAppointment?: ScheduledAppointment;
}

export interface ScheduledAppointment {
  serviceName: string;
  preferredName: string;
  email: string;
  phoneNumber: string;
  skinConcerns: string;
}

export enum ServiceType {
  Facial = "Facial",
  Package = "Package",
  AddOn = "AddOn",
}

export interface Service {
  serviceName: string;
  promotionName?: string;
  serviceType: ServiceType;
  cardTitle: string;
  cardContent: string;
  cardImgSrc: string;
  cardOverlayContent?: string;
  packageItems?: string[];
  tags?: string[];
  notBookable?: boolean;
  price?: string;
}

export interface ConsentFormStatement {
  id: number;
  statement: string;
  isActive: boolean;
}

export type Base64URLString = string | null;
