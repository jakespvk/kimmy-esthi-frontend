"use client";

import { fetchServicesSearch } from "@/app/api";
import { ServiceCardType } from "@/app/types";
import { createContext } from "react";

export const ServicesContext = createContext({
  signatureFacials: await fetchServicesSearch(ServiceCardType.Facial),
  facialPackages: await fetchServicesSearch(ServiceCardType.Package),
  serviceAddOns: await fetchServicesSearch(ServiceCardType.AddOn),
});
