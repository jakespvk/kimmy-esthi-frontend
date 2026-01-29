import { Base64URLString, ConsentFormStatement, Service, ServiceType } from "./types";

export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function submitConsentForm(clientId: string, printedName: string, initialedStatements: string[], initials: Base64URLString, signature: Base64URLString) {
  const response = await fetch(`${baseUrl}/consentForm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clientId: clientId,
      printedName: printedName,
      initialedStatements: initialedStatements,
      initials: initials,
      signature: signature,
    }),
  });
  if (!response.ok) {
    console.error("err:", response.statusText);
  }
  const result = await response.json();
  return result;
}

export async function fetchPromotions() {
  const response = await fetch(`${baseUrl}/promotions`);
  if (!response.ok) {
    console.error("err:", response.statusText);
  }
  const result = await response.json();
  return result;
}

export async function fetchServices(): Promise<Service[]> {
  const response = await fetch(`${baseUrl}/services`);
  if (!response.ok) {
    console.error("err:", response.statusText);
  }
  const result = await response.json();
  return result;
}

export async function fetchServicesSearch(type: ServiceType): Promise<Service[]> {
  const response = await fetch(`${baseUrl}/services/search?serviceType=${type}`);
  if (!response.ok) {
    console.error("err:", response.statusText);
  }
  const result = await response.json();
  return result;
}

export async function fetchConsentFormStatements(): Promise<ConsentFormStatement[]> {
  const response = await fetch(`${baseUrl}/consentForm/statements`);
  if (!response.ok) {
    console.error("err:", response.statusText);
  }
  const result = await response.json();
  return result;
}

export async function addOrUpdateStatement(statement: string, isActive: boolean, id?: number) {
  let response;
  if (!id) {
    response = await fetch(`${baseUrl}/consentForm/statements`, {
      method: 'POST',
      body: JSON.stringify({ statement: statement, isActive: isActive }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    response = await fetch(`${baseUrl}/consentForm/statements`, {
      method: 'PUT',
      body: JSON.stringify({ id: id, statement: statement, isActive: isActive }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  if (!response.ok) {
    console.error("err:", response.statusText);
  }
  return response;
}
