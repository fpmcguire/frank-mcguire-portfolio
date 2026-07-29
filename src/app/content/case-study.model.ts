import { isRecord, isStringArray } from './json-validation.util';

export const CASE_STUDY_CLASSIFICATIONS = [
  'independent-product',
  'personal-project',
  'open-source',
  'professional-experience',
  'proprietary',
] as const;

export type CaseStudyClassification = (typeof CASE_STUDY_CLASSIFICATIONS)[number];

export const CASE_STUDY_STATUSES = [
  'public-demo',
  'public-repository',
  'private-proprietary',
  'employment-summary',
] as const;

export type CaseStudyStatus = (typeof CASE_STUDY_STATUSES)[number];

export interface CaseStudy {
  readonly id: string;
  readonly title: string;
  readonly projectType: string;
  readonly classification: CaseStudyClassification;
  readonly status: CaseStudyStatus;
  readonly role: string;
  readonly summary: string;
  readonly evidence: readonly string[];
  readonly technologies: readonly string[];
  readonly modwRelevance?: string;
  readonly href?: string;
}

function isCaseStudyClassification(value: unknown): value is CaseStudyClassification {
  return (
    typeof value === 'string' &&
    (CASE_STUDY_CLASSIFICATIONS as readonly string[]).includes(value)
  );
}

function isCaseStudyStatus(value: unknown): value is CaseStudyStatus {
  return typeof value === 'string' && (CASE_STUDY_STATUSES as readonly string[]).includes(value);
}

export function isCaseStudy(value: unknown): value is CaseStudy {
  return (
    isRecord(value) &&
    typeof value['id'] === 'string' &&
    typeof value['title'] === 'string' &&
    typeof value['projectType'] === 'string' &&
    isCaseStudyClassification(value['classification']) &&
    isCaseStudyStatus(value['status']) &&
    typeof value['role'] === 'string' &&
    typeof value['summary'] === 'string' &&
    isStringArray(value['evidence']) &&
    isStringArray(value['technologies']) &&
    (value['modwRelevance'] === undefined || typeof value['modwRelevance'] === 'string') &&
    (value['href'] === undefined || typeof value['href'] === 'string')
  );
}

export function isCaseStudyArray(value: unknown): value is CaseStudy[] {
  return Array.isArray(value) && value.every(isCaseStudy);
}
