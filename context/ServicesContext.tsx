"use client";

import { fetchServicesSearch, fetchConsentFormStatements, fetchActiveConsentFormStatements } from "@/app/api";
import { ServiceType } from "@/app/types";
import { createContext } from "react";

export const ServicesContext = createContext({
  signatureFacials: await fetchServicesSearch(ServiceType.Facial),
  facialPackages: await fetchServicesSearch(ServiceType.Package),
  serviceAddOns: await fetchServicesSearch(ServiceType.AddOn),
  consentFormStatements: await fetchConsentFormStatements(),
  activeConsentFormStatements: await fetchActiveConsentFormStatements(),
});
