import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { isModwContent } from './modw-content.model';

const PROHIBITED_PHRASES = [
  'ai agent automation framework',
  'automation framework',
  'autonomous coding system',
  'autonomous agent framework',
  'replaces developers',
  'guarantees quality',
  'ai automation',
];

describe('public/content/modw.json (production content)', () => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const modwJsonPath = resolve(currentDir, '../../../public/content/modw.json');
  const content: unknown = JSON.parse(readFileSync(modwJsonPath, 'utf-8'));

  it('is a valid ModwContent shape', () => {
    expect(isModwContent(content)).toBe(true);
  });

  it('does not contain prohibited MOD-W claims', () => {
    const haystack = JSON.stringify(content).toLowerCase();

    for (const phrase of PROHIBITED_PHRASES) {
      expect(haystack).not.toContain(phrase);
    }
  });
});
