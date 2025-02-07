import { generateShareCode } from '../sharing';

describe('generateShareCode', () => {
  it('generates code of specified length', () => {
    const code = generateShareCode(8);
    expect(code.length).toBe(8);
  });

  it('uses default length of 6', () => {
    const code = generateShareCode();
    expect(code.length).toBe(6);
  });

  it('generates only alphanumeric characters', () => {
    const code = generateShareCode(10);
    expect(code).toMatch(/^[A-Z0-9]+$/);
  });

  it('generates different codes each time', () => {
    const code1 = generateShareCode();
    const code2 = generateShareCode();
    expect(code1).not.toBe(code2);
  });
}); 