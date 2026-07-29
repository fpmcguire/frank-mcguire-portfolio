import { isRecord } from './json-validation.util';

export interface ModwCta {
  readonly label: string;
  readonly href: string;
}

export interface ModwPrinciple {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
}

export interface ModwRole {
  readonly id: string;
  readonly label: string;
  readonly responsibility: string;
}

export interface ModwProjectEvidence {
  readonly id: string;
  readonly label: string;
  readonly summary: string;
}

export interface ModwContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly problem: string;
  readonly coreIdea: string;
  readonly repositoryCta: ModwCta;
  readonly consultingCta: ModwCta;
  readonly principles: readonly ModwPrinciple[];
  readonly roles: readonly ModwRole[];
  readonly projectEvidence: readonly ModwProjectEvidence[];
}

function isModwCta(value: unknown): value is ModwCta {
  return isRecord(value) && typeof value['label'] === 'string' && typeof value['href'] === 'string';
}

function isModwPrinciple(value: unknown): value is ModwPrinciple {
  return (
    isRecord(value) &&
    typeof value['id'] === 'string' &&
    typeof value['title'] === 'string' &&
    typeof value['summary'] === 'string'
  );
}

function isModwRole(value: unknown): value is ModwRole {
  return (
    isRecord(value) &&
    typeof value['id'] === 'string' &&
    typeof value['label'] === 'string' &&
    typeof value['responsibility'] === 'string'
  );
}

function isModwProjectEvidence(value: unknown): value is ModwProjectEvidence {
  return (
    isRecord(value) &&
    typeof value['id'] === 'string' &&
    typeof value['label'] === 'string' &&
    typeof value['summary'] === 'string'
  );
}

export function isModwContent(value: unknown): value is ModwContent {
  return (
    isRecord(value) &&
    typeof value['eyebrow'] === 'string' &&
    typeof value['title'] === 'string' &&
    typeof value['summary'] === 'string' &&
    typeof value['problem'] === 'string' &&
    typeof value['coreIdea'] === 'string' &&
    isModwCta(value['repositoryCta']) &&
    isModwCta(value['consultingCta']) &&
    Array.isArray(value['principles']) &&
    value['principles'].every(isModwPrinciple) &&
    Array.isArray(value['roles']) &&
    value['roles'].every(isModwRole) &&
    Array.isArray(value['projectEvidence']) &&
    value['projectEvidence'].every(isModwProjectEvidence)
  );
}
