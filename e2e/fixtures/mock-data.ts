import { format, addDays } from "date-fns";

// ---- Services ----

export const mockFacials = [
  {
    serviceName: "Sunset Glow Facial",
    serviceType: "Facial",
    cardTitle: "Sunset Glow Facial",
    cardContent: "A rejuvenating facial for radiant skin.",
    cardImgSrc: "https://placehold.co/400x300",
    cardOverlayContent: "Experience our signature glow-up treatment.",
    tags: ["Popular"],
    price: "$120",
    notBookable: false,
  },
  {
    serviceName: "Deep Cleanse Facial",
    serviceType: "Facial",
    cardTitle: "Deep Cleanse Facial",
    cardContent: "A deep cleansing facial for clear skin.",
    cardImgSrc: "https://placehold.co/400x300",
    cardOverlayContent: "Deep pore cleansing treatment.",
    tags: ["Best Seller"],
    price: "$95",
    notBookable: false,
  },
];

export const mockPackages = [
  {
    serviceName: "Glow Package",
    serviceType: "Package",
    cardTitle: "Glow Package",
    cardContent: "The ultimate glow package.",
    cardImgSrc: "https://placehold.co/400x300",
    cardOverlayContent: "Multiple sessions for lasting results.",
    packageItems: ["Sunset Glow Facial", "LED Light Therapy", "Hydrating Mask"],
    tags: ["Save 15%"],
    price: "$299",
    notBookable: false,
  },
];

export const mockAddOns = [
  {
    serviceName: "LED Light Therapy",
    serviceType: "AddOn",
    cardTitle: "LED Light Therapy",
    cardContent: "Add LED therapy to any facial.",
    cardImgSrc: "https://placehold.co/400x300",
    cardOverlayContent: "Boost your treatment with LED.",
    price: "$35",
    notBookable: false,
  },
  {
    serviceName: "Lip Treatment",
    serviceType: "AddOn",
    cardTitle: "Lip Treatment",
    cardContent: "Hydrating lip treatment.",
    cardImgSrc: "https://placehold.co/400x300",
    price: "$20",
    notBookable: true,
  },
];

// ---- Appointments ----

const tomorrow = addDays(new Date(), 1);
const dayAfter = addDays(new Date(), 2);

export const tomorrowFormatted = format(tomorrow, "MM-dd-yyyy");
export const dayAfterFormatted = format(dayAfter, "MM-dd-yyyy");

export const mockAppointmentStatuses = [
  { dateTime: tomorrow.toISOString(), status: 1 }, // has available slots
  { dateTime: dayAfter.toISOString(), status: 0 }, // fully booked
];

export const mockAppointmentsForDate = [
  {
    id: "appt-001",
    dateTime: new Date(
      tomorrow.getFullYear(),
      tomorrow.getMonth(),
      tomorrow.getDate(),
      10,
      0
    ).toISOString(),
    status: false, // available
  },
  {
    id: "appt-002",
    dateTime: new Date(
      tomorrow.getFullYear(),
      tomorrow.getMonth(),
      tomorrow.getDate(),
      10,
      30
    ).toISOString(),
    status: true, // booked
  },
  {
    id: "appt-003",
    dateTime: new Date(
      tomorrow.getFullYear(),
      tomorrow.getMonth(),
      tomorrow.getDate(),
      11,
      0
    ).toISOString(),
    status: false, // available
  },
];

export const mockSingleAppointment = {
  id: "appt-001",
  date: new Date(
    tomorrow.getFullYear(),
    tomorrow.getMonth(),
    tomorrow.getDate(),
    10,
    0
  ).toISOString(),
  time: new Date(
    tomorrow.getFullYear(),
    tomorrow.getMonth(),
    tomorrow.getDate(),
    10,
    0
  ).toISOString(),
  status: false,
};

// ---- Consent Form ----

export const mockClientId = "client-abc-123";

export const mockActiveStatements = [
  {
    id: 1,
    statement:
      "I understand that the facial treatment is a cosmetic procedure and not a medical treatment.",
    isActive: true,
  },
  {
    id: 2,
    statement:
      "I confirm that I have disclosed all relevant medical information to the esthetician.",
    isActive: true,
  },
  {
    id: 3,
    statement:
      "I agree to follow any aftercare instructions provided by the esthetician.",
    isActive: true,
  },
];
