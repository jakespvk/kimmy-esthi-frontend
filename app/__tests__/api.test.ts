// Test file for consent-form API functions
// Tests all API functions in the order used during consent-form completion

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  postClientInfo,
  saveProductsUsed,
  sendSkincareHistoryQuestionnaire,
  saveEmergencyContact,
  saveConsentAndAcknowledgement,
  submitConsentForm,
  fetchActiveConsentFormStatements
} from '../api';
import { ConsentFormClientInfo, SkincareHistoryQuestionnaire, EmergencyContactDetails, ConsentFormStatement } from '../types';
import { Base64URLString } from '../types';

// Mock console.error to avoid cluttering test output
const originalConsoleError = console.error;

beforeEach(() => {
  vi.clearAllMocks();
  console.error = vi.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
});

// ============================================
// TEST SUITE 1: postClientInfo
// First API call - Client Information Entry
// ============================================
describe('postClientInfo', () => {
  const mockClientId = '550e8400-e29b-41d4-a716-446655440000';
  
  const validClientInfo: ConsentFormClientInfo = {
    fullName: 'Jane Doe',
    dob: '1990-05-15',
    gender: 'Female',
    phoneNumber: '+1-555-123-4567',
    email: 'jane.doe@example.com'
  };

  it('should successfully submit client info and return response', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockClientId)
    });
    global.fetch = mockFetch;

    const result = await postClientInfo(validClientInfo);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/consentForm/clientInfo'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    );
    expect(result).toBe(mockClientId);
  });

  it('should send correct request body with all fields', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockClientId)
    });
    global.fetch = mockFetch;

    await postClientInfo(validClientInfo);

    const callArgs = mockFetch.mock.calls[0];
    const bodyString = callArgs[1].body;
    const body = JSON.parse(bodyString);

    expect(body).toEqual(validClientInfo);
    expect(body.fullName).toBe('Jane Doe');
    expect(body.dob).toBe('1990-05-15');
    expect(body.gender).toBe('Female');
    expect(body.phoneNumber).toBe('+1-555-123-4567');
    expect(body.email).toBe('jane.doe@example.com');
  });

  it('should handle network error gracefully', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'));
    global.fetch = mockFetch;

    await expect(postClientInfo(validClientInfo)).rejects.toThrow('Network error');
  });

  it('should log error on non-OK response', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Bad Request',
      json: () => Promise.resolve(null)
    });
    global.fetch = mockFetch;

    const result = await postClientInfo(validClientInfo);

    expect(console.error).toHaveBeenCalledWith('err:', 'Bad Request');
  });

  it('should parse JSON response correctly', async () => {
    const mockResponse = { id: mockClientId, status: 'created' };
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });
    global.fetch = mockFetch;

    const result = await postClientInfo(validClientInfo);

    expect(result).toEqual(mockResponse);
  });
});

// ============================================
// TEST SUITE 2: saveProductsUsed
// Second API call - Products Page
// ============================================
describe('saveProductsUsed', () => {
  const mockClientId = '550e8400-e29b-41d4-a716-446655440000';
  
  const validProducts = 'Versed Light Moisturizer, Dermalogica Toner Pads, La Mer Serum';

  it('should successfully save products with valid data', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    });
    global.fetch = mockFetch;

    const result = await saveProductsUsed(mockClientId, validProducts);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/consentForm/products'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    );
    expect(result).toBe(200);
  });

  it('should send correct request body with clientId and products', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    });
    global.fetch = mockFetch;

    await saveProductsUsed(mockClientId, validProducts);

    const callArgs = mockFetch.mock.calls[0];
    const bodyString = callArgs[1].body;
    const body = JSON.parse(bodyString);

    expect(body).toEqual({ clientId: mockClientId, products: validProducts });
  });

  it('should handle empty products string', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    });
    global.fetch = mockFetch;

    const result = await saveProductsUsed(mockClientId, '');

    expect(mockFetch).toHaveBeenCalled();
    expect(result).toBe(200);
  });

  it('should log error on non-OK response', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Internal Server Error'
    });
    global.fetch = mockFetch;

    await saveProductsUsed(mockClientId, validProducts);

    expect(console.error).toHaveBeenCalledWith('err:', 'Internal Server Error');
  });

  it('should handle network errors', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Network timeout'));
    global.fetch = mockFetch;

    await expect(saveProductsUsed(mockClientId, validProducts)).rejects.toThrow('Network timeout');
  });
});

// ============================================
// TEST SUITE 3: sendSkincareHistoryQuestionnaire
// Third API call - Skincare History
// ============================================
describe('sendSkincareHistoryQuestionnaire', () => {
  const mockClientId = '550e8400-e29b-41d4-a716-446655440000';
  
  const validQuestionnaire: SkincareHistoryQuestionnaire = {
    everReceivedFacial: 'yes',
    lastFacialDate: '2024-01-15',
    retinol: 'no',
    chemPeel: 'yes',
    lastChemPeelDate: '2023-11-20',
    hairRemoval: 'no',
    medicalConditions: 'no',
    allergies: 'yes',
    botox: 'no',
    negativeReaction: 'no',
    skinType: 'combination'
  };

  it('should successfully submit questionnaire with all fields', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    });
    global.fetch = mockFetch;

    const result = await sendSkincareHistoryQuestionnaire(mockClientId, validQuestionnaire);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/consentForm/skincareHistory'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    );
    expect(result).toBe(200);
  });

  it('should convert yes/no strings to booleans correctly', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    });
    global.fetch = mockFetch;

    await sendSkincareHistoryQuestionnaire(mockClientId, validQuestionnaire);

    const callArgs = mockFetch.mock.calls[0];
    const bodyString = callArgs[1].body;
    const body = JSON.parse(bodyString);

    const processedQuestionnaire = body.skincareHistoryQuestionnaire;
    
    expect(processedQuestionnaire.everReceivedFacial).toBe(true);
    expect(processedQuestionnaire.retinol).toBe(false);
    expect(processedQuestionnaire.chemPeel).toBe(true);
    expect(processedQuestionnaire.hairRemoval).toBe(false);
    expect(processedQuestionnaire.medicalConditions).toBe(false);
    expect(processedQuestionnaire.allergies).toBe(true);
    expect(processedQuestionnaire.botox).toBe(false);
    expect(processedQuestionnaire.negativeReaction).toBe(false);
  });

  it('should convert date strings to ISO-8601 format', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    });
    global.fetch = mockFetch;

    await sendSkincareHistoryQuestionnaire(mockClientId, validQuestionnaire);

    const callArgs = mockFetch.mock.calls[0];
    const bodyString = callArgs[1].body;
    const body = JSON.parse(bodyString);

    const processedQuestionnaire = body.skincareHistoryQuestionnaire;
    
    expect(processedQuestionnaire.lastFacialDate).toBe('2024-01-15T00:00:00.000Z');
    expect(processedQuestionnaire.lastChemPeelDate).toBe('2023-11-20T00:00:00.000Z');
  });

  it('should handle invalid date strings and return null', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    });
    global.fetch = mockFetch;

    const invalidDateQuestionnaire = {
      ...validQuestionnaire,
      lastFacialDate: 'invalid-date'
    };

    await sendSkincareHistoryQuestionnaire(mockClientId, invalidDateQuestionnaire);

    const callArgs = mockFetch.mock.calls[0];
    const bodyString = callArgs[1].body;
    const body = JSON.parse(bodyString);

    const processedQuestionnaire = body.skincareHistoryQuestionnaire;
    
    expect(processedQuestionnaire.lastFacialDate).toBeNull();
  });

  it('should handle empty date strings and return null', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    });
    global.fetch = mockFetch;

    const emptyDateQuestionnaire = {
      ...validQuestionnaire,
      lastFacialDate: '',
      lastChemPeelDate: ''
    };

    await sendSkincareHistoryQuestionnaire(mockClientId, emptyDateQuestionnaire);

    const callArgs = mockFetch.mock.calls[0];
    const bodyString = callArgs[1].body;
    const body = JSON.parse(bodyString);

    const processedQuestionnaire = body.skincareHistoryQuestionnaire;
    
    expect(processedQuestionnaire.lastFacialDate).toBeNull();
    expect(processedQuestionnaire.lastChemPeelDate).toBeNull();
  });

  it('should validate processed questionnaire structure', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    });
    global.fetch = mockFetch;

    await sendSkincareHistoryQuestionnaire(mockClientId, validQuestionnaire);

    const callArgs = mockFetch.mock.calls[0];
    const bodyString = callArgs[1].body;
    const body = JSON.parse(bodyString);

    expect(body).toHaveProperty('clientId');
    expect(body).toHaveProperty('skincareHistoryQuestionnaire');
    expect(body.clientId).toBe(mockClientId);
    expect(body.skincareHistoryQuestionnaire).toHaveProperty('clientId');
    expect(body.skincareHistoryQuestionnaire).toHaveProperty('skinType');
    expect(body.skincareHistoryQuestionnaire.clientId).toBe(mockClientId);
  });

  it('should handle network errors', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'));
    global.fetch = mockFetch;

    await expect(sendSkincareHistoryQuestionnaire(mockClientId, validQuestionnaire))
      .rejects.toThrow('Network error');
  });

  it('should log error on non-OK response', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Bad Request'
    });
    global.fetch = mockFetch;

    await sendSkincareHistoryQuestionnaire(mockClientId, validQuestionnaire);

    expect(console.error).toHaveBeenCalledWith('err:', 'Bad Request');
  });

  it('should preserve skin type as string', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    });
    global.fetch = mockFetch;

    await sendSkincareHistoryQuestionnaire(mockClientId, validQuestionnaire);

    const callArgs = mockFetch.mock.calls[0];
    const bodyString = callArgs[1].body;
    const body = JSON.parse(bodyString);

    const processedQuestionnaire = body.skincareHistoryQuestionnaire;
    
    expect(processedQuestionnaire.skinType).toBe('combination');
    expect(typeof processedQuestionnaire.skinType).toBe('string');
  });
});

// ============================================
// TEST SUITE 4: saveEmergencyContact
// Fourth API call - Emergency Contact
// ============================================
describe('saveEmergencyContact', () => {
  const mockClientId = '550e8400-e29b-41d4-a716-446655440000';
  
  const validEmergencyContact: EmergencyContactDetails = {
    name: 'John Doe',
    phone: '+1-555-987-6543',
    relationship: 'Spouse'
  };

  it('should successfully save emergency contact with valid data', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    });
    global.fetch = mockFetch;

    const result = await saveEmergencyContact(mockClientId, validEmergencyContact);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/consentForm/emergencyContact'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    );
    expect(result).toBe(200);
  });

  it('should send correct request body with clientId and emergency contact', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    });
    global.fetch = mockFetch;

    await saveEmergencyContact(mockClientId, validEmergencyContact);

    const callArgs = mockFetch.mock.calls[0];
    const bodyString = callArgs[1].body;
    const body = JSON.parse(bodyString);

    expect(body).toEqual({ clientId: mockClientId, emergencyContact: validEmergencyContact });
    expect(body.clientId).toBe(mockClientId);
    expect(body.emergencyContact.name).toBe('John Doe');
    expect(body.emergencyContact.phone).toBe('+1-555-987-6543');
    expect(body.emergencyContact.relationship).toBe('Spouse');
  });

  it('should handle emergency contact with minimal fields', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    });
    global.fetch = mockFetch;

    const minimalContact: EmergencyContactDetails = {
      name: 'Jane Smith',
      phone: '555-1234',
      relationship: 'Friend'
    };

    await saveEmergencyContact(mockClientId, minimalContact);

    expect(mockFetch).toHaveBeenCalled();
  });

  it('should return status code on success', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 201
    });
    global.fetch = mockFetch;

    const result = await saveEmergencyContact(mockClientId, validEmergencyContact);

    expect(result).toBe(201);
  });

  it('should log error on non-OK response', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Not Found'
    });
    global.fetch = mockFetch;

    await saveEmergencyContact(mockClientId, validEmergencyContact);

    expect(console.error).toHaveBeenCalledWith('err:', 'Not Found');
  });

  it('should handle network errors', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Connection failed'));
    global.fetch = mockFetch;

    await expect(saveEmergencyContact(mockClientId, validEmergencyContact))
      .rejects.toThrow('Connection failed');
  });

  it('should accept emergency contact with special characters in name', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    });
    global.fetch = mockFetch;

    const specialContact: EmergencyContactDetails = {
      name: "Mary O'Connor",
      phone: '+1-555-765-4321',
      relationship: 'Sister-in-law'
    };

    await saveEmergencyContact(mockClientId, specialContact);

    expect(mockFetch).toHaveBeenCalled();
  });
});

// ============================================
// TEST SUITE 5: saveConsentAndAcknowledgement
// Fifth API call - Consent & Acknowledgement
// ============================================
describe('saveConsentAndAcknowledgement', () => {
  const mockClientId = '550e8400-e29b-41d4-a716-446655440000';
  const mockSignature = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';

  it('should successfully save consent and acknowledgement with valid signature', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    });
    global.fetch = mockFetch;

    const result = await saveConsentAndAcknowledgement(mockClientId, mockSignature);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/consentForm/consentAndAcknowledgement'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    );
    expect(result).toBe(200);
  });

  it('should send correct request body with clientId and signature', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    });
    global.fetch = mockFetch;

    await saveConsentAndAcknowledgement(mockClientId, mockSignature);

    const callArgs = mockFetch.mock.calls[0];
    const bodyString = callArgs[1].body;
    const body = JSON.parse(bodyString);

    expect(body).toEqual({ clientId: mockClientId, signature: mockSignature });
  });

  it('should handle null signature', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    });
    global.fetch = mockFetch;

    const result = await saveConsentAndAcknowledgement(mockClientId, null);

    expect(mockFetch).toHaveBeenCalled();
    expect(result).toBe(200);
  });

  it('should log error on non-OK response', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Bad Request'
    });
    global.fetch = mockFetch;

    await saveConsentAndAcknowledgement(mockClientId, mockSignature);

    expect(console.error).toHaveBeenCalledWith('err:', 'Bad Request');
  });

  it('should handle network errors', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'));
    global.fetch = mockFetch;

    await expect(saveConsentAndAcknowledgement(mockClientId, mockSignature))
      .rejects.toThrow('Network error');
  });

  it('should accept valid Base64 signature format', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200
    });
    global.fetch = mockFetch;

    const validBase64 = 'data:image/png;base64,iVBORw0KGgo=';
    await saveConsentAndAcknowledgement(mockClientId, validBase64 as Base64URLString);

    expect(mockFetch).toHaveBeenCalled();
  });
});

// ============================================
// TEST SUITE 6: fetchActiveConsentFormStatements
// Preloaded before final submission
// ============================================
describe('fetchActiveConsentFormStatements', () => {
  const mockStatements: ConsentFormStatement[] = [
    {
      id: 1,
      statement: 'I understand the nature of the facial treatment and agree to proceed voluntarily.',
      isActive: true
    },
    {
      id: 2,
      statement: 'I have disclosed all relevant medical information and understand the risks and benefits.',
      isActive: true
    },
    {
      id: 3,
      statement: 'I agree to follow any aftercare instructions provided by the esthetician.',
      isActive: true
    }
  ];

  it('should successfully fetch active consent form statements', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockStatements)
    });
    global.fetch = mockFetch;

    const result = await fetchActiveConsentFormStatements();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/consentForm/statements/active')
    );
    expect(result).toEqual(mockStatements);
  });

  it('should return array of statements with correct structure', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockStatements)
    });
    global.fetch = mockFetch;

    const result = await fetchActiveConsentFormStatements();

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(3);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('statement');
    expect(result[0]).toHaveProperty('isActive');
    expect(result[0].statement).toContain('I understand the nature of the facial treatment');
  });

  it('should handle empty array when no active statements exist', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([])
    });
    global.fetch = mockFetch;

    const result = await fetchActiveConsentFormStatements();

    expect(result).toEqual([]);
  });

  it('should log error on non-OK response', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Unauthorized',
      json: () => Promise.resolve(null)
    });
    global.fetch = mockFetch;

    const result = await fetchActiveConsentFormStatements();

    expect(console.error).toHaveBeenCalledWith('err:', 'Unauthorized');
  });

  it('should handle network errors', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Server unavailable'));
    global.fetch = mockFetch;

    await expect(fetchActiveConsentFormStatements())
      .rejects.toThrow('Server unavailable');
  });

  it('should handle statements with additional properties', async () => {
    const extendedStatements: ConsentFormStatement[] = [
      {
        id: 1,
        statement: 'Test statement',
        isActive: true
      },
      {
        id: 2,
        statement: 'Another test',
        isActive: false,
        initialed: false
      }
    ];
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(extendedStatements)
    });
    global.fetch = mockFetch;

    const result = await fetchActiveConsentFormStatements();

    expect(result).toEqual(extendedStatements);
  });

  it('should verify API endpoint structure', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockStatements)
    });
    global.fetch = mockFetch;

    await fetchActiveConsentFormStatements();

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/consentForm\/statements\/active$/)
    );
  });
});

// ============================================
// TEST SUITE 7: submitConsentForm
// Final API call - Complete Form Submission
// ============================================
describe('submitConsentForm', () => {
  const mockClientId = '550e8400-e29b-41d4-a716-446655440000';
  const mockPrintedName = 'Jane Doe';
  const mockInitialedStatements = [
    'I understand the nature of the facial treatment and agree to proceed voluntarily.',
    'I have disclosed all relevant medical information and understand the risks and benefits.',
    'I agree to follow any aftercare instructions provided by the esthetician.'
  ];
  const mockInitials = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';
  const mockSignature = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';

  it('should successfully submit consent form with all required fields', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true })
    });
    global.fetch = mockFetch;

    const result = await submitConsentForm(
      mockPrintedName,
      mockInitialedStatements,
      mockInitials,
      mockSignature,
      mockClientId
    );

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/consentForm'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    );
    expect(result).toEqual({ success: true });
  });

  it('should send correct request body structure', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true })
    });
    global.fetch = mockFetch;

    await submitConsentForm(
      mockPrintedName,
      mockInitialedStatements,
      mockInitials,
      mockSignature,
      mockClientId
    );

    const callArgs = mockFetch.mock.calls[0];
    const bodyString = callArgs[1].body;
    const body = JSON.parse(bodyString);

    expect(body).toEqual({
      clientId: mockClientId,
      printedName: mockPrintedName,
      initialedStatements: mockInitialedStatements,
      initials: mockInitials,
      signature: mockSignature
    });
  });

  it('should handle submission without clientId', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true })
    });
    global.fetch = mockFetch;

    const result = await submitConsentForm(
      mockPrintedName,
      mockInitialedStatements,
      mockInitials,
      mockSignature,
      undefined
    );

    expect(mockFetch).toHaveBeenCalled();

    const callArgs = mockFetch.mock.calls[0];
    const bodyString = callArgs[1].body;
    const body = JSON.parse(bodyString);

    expect(body.clientId).toBeUndefined();
  });

  it('should handle empty initialedStatements array', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: false })
    });
    global.fetch = mockFetch;

    const result = await submitConsentForm(
      mockPrintedName,
      [],
      mockInitials,
      mockSignature,
      mockClientId
    );

    expect(mockFetch).toHaveBeenCalled();
    expect(result).toEqual({ success: false });
  });

  it('should handle null initials and signature', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true })
    });
    global.fetch = mockFetch;

    const result = await submitConsentForm(
      mockPrintedName,
      mockInitialedStatements,
      null,
      null,
      mockClientId
    );

    expect(mockFetch).toHaveBeenCalled();

    const callArgs = mockFetch.mock.calls[0];
    const bodyString = callArgs[1].body;
    const body = JSON.parse(bodyString);

    expect(body.initials).toBeNull();
    expect(body.signature).toBeNull();
  });

  it('should log error on non-OK response', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Invalid submission',
      json: () => Promise.resolve({ error: 'Invalid submission' })
    });
    global.fetch = mockFetch;

    const result = await submitConsentForm(
      mockPrintedName,
      mockInitialedStatements,
      mockInitials,
      mockSignature,
      mockClientId
    );

    expect(console.error).toHaveBeenCalledWith('err:', 'Invalid submission');
  });

  it('should handle network errors', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Connection timeout'));
    global.fetch = mockFetch;

    await expect(submitConsentForm(
      mockPrintedName,
      mockInitialedStatements,
      mockInitials,
      mockSignature,
      mockClientId
    )).rejects.toThrow('Connection timeout');
  });

  it('should handle single statement in array', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true })
    });
    global.fetch = mockFetch;

    const singleStatement = ['I understand the nature of the facial treatment.'];
    await submitConsentForm(
      mockPrintedName,
      singleStatement,
      mockInitials,
      mockSignature,
      mockClientId
    );

    expect(mockFetch).toHaveBeenCalled();
  });

  it('should verify request body field names', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true })
    });
    global.fetch = mockFetch;

    await submitConsentForm(
      mockPrintedName,
      mockInitialedStatements,
      mockInitials,
      mockSignature,
      mockClientId
    );

    const callArgs = mockFetch.mock.calls[0];
    const bodyString = callArgs[1].body;
    const body = JSON.parse(bodyString);

    expect(body).toHaveProperty('clientId');
    expect(body).toHaveProperty('printedName');
    expect(body).toHaveProperty('initialedStatements');
    expect(body).toHaveProperty('initials');
    expect(body).toHaveProperty('signature');
  });
});