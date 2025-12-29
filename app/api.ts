import { Base64URLString } from "./types";

export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function submitConsentForm(appointmentId: string, initialedStatements: string[], initials: Base64URLString, signature: Base64URLString) {
  const response = await fetch(`${baseUrl}/booking/consent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      appointmentId: appointmentId,
      initialedStatements: initialedStatements,
      initials: initials,
      signature: signature,
    }),
  });
  if (!response.ok) {
    console.error("err:", response.statusText);
  }
  return response;
}
