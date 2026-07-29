import { isRecord } from './json-validation.util';

export interface ModwPrinciple {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
}

export interface ModwContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly repositoryHref: string;
  readonly consultingHref: string;
  readonly principles: readonly ModwPrinciple[];
}

function isModwPrinciple(value: unknown): value is ModwPrinciple {
  return (
    isRecord(value) &&
    typeof value['id'] === 'string' &&
    typeof value['title'] === 'string' &&
    typeof value['summary'] === 'string'
  );
}

export function isModwContent(value: unknown): value is ModwContent {
  return (
    isRecord(value) &&
    typeof value['eyebrow'] === 'string' &&
    typeof value['title'] === 'string' &&
    typeof value['summary'] === 'string' &&
    typeof value['repositoryHref'] === 'string' &&
    typeof value['consultingHref'] === 'string' &&
    Array.isArray(value['principles']) &&
    value['principles'].every(isModwPrinciple)
  );
}
