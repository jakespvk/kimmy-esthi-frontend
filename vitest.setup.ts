// Vitest setup file
import { vi } from 'vitest';

// Setup global fetch mock for all tests
global.fetch = vi.fn();