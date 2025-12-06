export interface Appointment {
  id?: string;
  dateTime: string;
  status: boolean;
  appointmentType?: string;
  scheduledAppointment?: ScheduledAppointment;
}

export interface ScheduledAppointment {
  serviceName: string;
}

export enum ServiceCardType {
  Facial,
  Package,
  AddOn
}

export interface Service {
  serviceName: string;
  serviceType: ServiceCardType;
  cardTitle: string;
  cardContent: string;
  cardImgSrc: string;
  cardLinkTo: string;
  cardOverlayContent?: string;
  packageItems?: string[];
  tags?: string[];
  notBookable?: boolean;
  price?: string;
}

