"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LegacyConsentRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    router.replace(query ? `/consent-form?${query}` : "/consent-form");
  }, [router, searchParams]);

  return <div className="p-6 text-center text-sm text-muted-foreground">Redirecting to the full consent form...</div>;
}
