import { Suspense } from "react";

import LegacyConsentRedirect from "../legacy-consent-redirect";

export default function InitialStatementsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-sm text-muted-foreground">Redirecting to the full consent form...</div>}>
      <LegacyConsentRedirect />
    </Suspense>
  );
}
