"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchServicesSearch, fetchConsentFormStatements, fetchActiveConsentFormStatements } from "@/app/api";
import { ServiceType, Service } from "@/app/types";

export function useServices() {
  return {
    signatureFacials: useQuery({
      queryKey: ['services', 'facial'],
      queryFn: () => fetchServicesSearch(ServiceType.Facial),
    }),
    facialPackages: useQuery({
      queryKey: ['services', 'package'],
      queryFn: () => fetchServicesSearch(ServiceType.Package),
    }),
    serviceAddOns: useQuery({
      queryKey: ['services', 'addon'],
      queryFn: () => fetchServicesSearch(ServiceType.AddOn),
    }),
  };
}

export function useServicesAll(): { services: Service[] | null; isLoading: boolean; error: unknown } {
  const { signatureFacials, facialPackages, serviceAddOns } = useServices();
  const isPending = signatureFacials.isPending || facialPackages.isPending || serviceAddOns.isPending;
  const isError = signatureFacials.isError || facialPackages.isError || serviceAddOns.isError;
  const data = [
    ...(signatureFacials.data ?? []),
    ...(facialPackages.data ?? []),
    ...(serviceAddOns.data ?? []),
  ];

  return {
    services: data.length > 0 ? data : null,
    isLoading: isPending,
    error: signatureFacials.error || facialPackages.error || serviceAddOns.error,
  };
}

export function useConsentFormStatements() {
  return useQuery({
    queryKey: ['consent-form-statements'],
    queryFn: fetchConsentFormStatements,
  });
}

export function useActiveConsentFormStatements() {
  return useQuery({
    queryKey: ['active-consent-form-statements'],
    queryFn: fetchActiveConsentFormStatements,
  });
}