import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { isCaseStudyArray } from './case-study.model';

const EXPECTED_ORDER = [
  'brand-ui',
  'idp-align',
  'continuous-alignment-verification',
  'bio-align',
  'react-design-patterns',
  'angular-design-patterns',
  'mqtt-align',
  'agv-fleet-simulator',
  'paki',
  'travel-it',
  'kaufland',
  'academic-training',
];

describe('public/content/case-studies.json (production content)', () => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const jsonPath = resolve(currentDir, '../../../public/content/case-studies.json');
  const content: unknown = JSON.parse(readFileSync(jsonPath, 'utf-8'));

  it('is a valid CaseStudy array', () => {
    expect(isCaseStudyArray(content)).toBe(true);
  });

  it('lists case studies newest to oldest by initial commit, with employment and academic last', () => {
    if (!isCaseStudyArray(content)) {
      throw new Error('Invalid case-study production content');
    }

    expect(content.map((study) => study.id)).toEqual(EXPECTED_ORDER);
  });

  it('excludes MOD-W and Prismatic as case studies', () => {
    if (!isCaseStudyArray(content)) {
      throw new Error('Invalid case-study production content');
    }

    const ids = content.map((study) => study.id);
    expect(ids).not.toContain('mod-w');
    expect(ids).not.toContain('prismatic');
  });
});
