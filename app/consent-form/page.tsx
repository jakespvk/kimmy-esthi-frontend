import { Suspense } from "react";

import ConsentFormPageClient from "./consent-form-page-client";

export default function ConsentFormPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-sm text-muted-foreground">Loading consent form...</div>}>
      <ConsentFormPageClient />
    </Suspense>
  );
}
