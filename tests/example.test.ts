import { describe, it, expect } from 'vitest';

describe('simple math', () => {
  it('should add numbers correctly', () => {
    expect(1 + 1).toBe(2);
  });

  it('should work with strings', () => {
    expect('hello' + ' world').toBe('hello world');
  });
});