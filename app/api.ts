import { Base64URLString, ConsentFormClientInfo, ConsentFormStatement, EmergencyContactDetails, Rating, Service, ServiceType, SkincareHistoryQuestionnaire } from "./types";

export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function submitConsentForm(printedName: string, initialedStatements: string[], initials: Base64URLString, signature: Base64URLString, clientId?: string) {
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
    return;
  }
  const result = await response.json();
  return result;
}

export async function fetchServices(): Promise<Service[]> {
  const response = await fetch(`${baseUrl}/services`);
  if (!response.ok) {
    console.error("err:", response.statusText);
    throw new Error("unable to fetch services");
  }
  const result = await response.json();
  return result;
}

export async function fetchServicesSearch(type: ServiceType): Promise<Service[]> {
  const response = await fetch(`${baseUrl}/services/search?serviceType=${type}`);
  if (!response.ok) {
    console.error("err:", response.statusText);
    throw new Error("unable to fetch services");
  }
  const result = await response.json();
  return result;
}

export async function fetchConsentFormStatements(): Promise<ConsentFormStatement[]> {
  const response = await fetch(`${baseUrl}/consentForm/statements`);
  if (!response.ok) {
    console.error("err:", response.statusText);
    throw new Error("unable to fetch services");
  }
  const result = await response.json();
  return result;
}

export async function fetchActiveConsentFormStatements(): Promise<ConsentFormStatement[]> {
  const response = await fetch(`${baseUrl}/consentForm/statements/active`);
  if (!response.ok) {
    console.error("err:", response.statusText);
    throw new Error("unable to fetch services");
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
    return;
  }
  let result = await response.json();
  return result;
}

export async function deleteStatement(id: number) {
  const response = await fetch(`${baseUrl}/consentForm/statements/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.error("err:", response.statusText);
    return;
  }
}

export async function postClientInfo(clientInfo: ConsentFormClientInfo) {
  console.log(JSON.stringify(clientInfo));
  const response = await fetch(`${baseUrl}/consentForm/clientInfo`, {
    method: 'POST',
    body: JSON.stringify(clientInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    console.error("err:", response.statusText);
    return;
  }
  let result = await response.json();
  console.log(result);
  return result;
}

export async function sendSkincareHistoryQuestionnaire(clientId: string, skincareHistoryQuestionnaire: SkincareHistoryQuestionnaire) {
  const convertToBool = (value: string): boolean => value === 'yes';

  const processedQuestionnaire = {
    clientId: clientId,
    everReceivedFacial: convertToBool(skincareHistoryQuestionnaire.everReceivedFacial),
    lastFacialDate: skincareHistoryQuestionnaire.lastFacialDate,
    retinol: convertToBool(skincareHistoryQuestionnaire.retinol),
    chemPeel: convertToBool(skincareHistoryQuestionnaire.chemPeel),
    lastChemPeelDate: skincareHistoryQuestionnaire.lastChemPeelDate,
    hairRemoval: convertToBool(skincareHistoryQuestionnaire.hairRemoval),
    medicalConditions: convertToBool(skincareHistoryQuestionnaire.medicalConditions),
    allergies: convertToBool(skincareHistoryQuestionnaire.allergies),
    botox: convertToBool(skincareHistoryQuestionnaire.botox),
    negativeReaction: convertToBool(skincareHistoryQuestionnaire.negativeReaction),
    skinType: skincareHistoryQuestionnaire.skinType,
  };

  const response = await fetch(`${baseUrl}/consentForm/skincareHistory`, {
    method: 'POST',
    body: JSON.stringify({ clientId: clientId, skincareHistoryQuestionnaire: processedQuestionnaire }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    console.error("err:", response.statusText);
    return;
  }
  return response.status;
}

export async function saveEmergencyContact(clientId: string, emergencyContact: EmergencyContactDetails) {
  const response = await fetch(`${baseUrl}/consentForm/emergencyContact`, {
    method: 'POST',
    body: JSON.stringify({ clientId: clientId, emergencyContact }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    console.error("err:", response.statusText);
    return;
  }
  return response.status;
}

export async function saveConsentAndAcknowledgement(clientId: string, signature: Base64URLString) {
  const response = await fetch(`${baseUrl}/consentForm/consentAndAcknowledgement`, {
    method: 'POST',
    body: JSON.stringify({ clientId: clientId, signature: signature }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    console.error("err:", response.statusText);
    return;
  }
  return response.status;
}

export async function saveProductsUsed(clientId: string, products: string) {
  const response = await fetch(`${baseUrl}/consentForm/products`, {
    method: 'POST',
    body: JSON.stringify({ clientId: clientId, products: products }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    console.error("err:", response.statusText);
    return;
  }
  return response.status;
}

export async function getAllRatings() {
  const response = await fetch(`${baseUrl}/reviews`);
  return await response.json();
}

export async function savePostRating(review: Rating) {
  const response = await fetch(`${baseUrl}/reviews`, {
    method: 'POST',
    body: JSON.stringify(review),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    console.error("err:", response.statusText);
    return;
  }
  return response.status;
}
