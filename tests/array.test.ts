import { it, expect } from 'vitest';

it('array should have length', () => {
  const arr = [1, 2, 3];
  expect(arr).toHaveLength(3);
});

it('array should contain values', () => {
  const arr = [1, 2, 3];
  expect(arr).toContain(2);
});