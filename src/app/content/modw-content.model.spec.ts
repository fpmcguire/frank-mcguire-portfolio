import { ModwContent, isModwContent } from './modw-content.model';

const VALID_MODW_CONTENT: ModwContent = {
  eyebrow: '03 — Methodology',
  title: 'Moderated AI Development Workflow (MOD-W)',
  summary: 'Summary.',
  problem: 'Problem statement.',
  coreIdea: 'Core idea.',
  repositoryCta: { label: 'View the MOD-W repository', href: 'https://example.com/repo' },
  consultingCta: { label: 'Discuss MOD-W consulting or training', href: '#contact' },
  principles: [{ id: 'role-separation', title: 'Role separation', summary: 'Summary.' }],
  roles: [{ id: 'moderator', label: 'Moderator', responsibility: 'Responsibility.' }],
  projectEvidence: [{ id: 'mqtt-align', label: 'MQTT-Align', summary: 'Summary.' }],
};

describe('isModwContent', () => {
  it('accepts a fully valid ModwContent shape', () => {
    expect(isModwContent(VALID_MODW_CONTENT)).toBe(true);
  });

  it('accepts empty principles/roles/projectEvidence arrays', () => {
    expect(
      isModwContent({ ...VALID_MODW_CONTENT, principles: [], roles: [], projectEvidence: [] }),
    ).toBe(true);
  });

  it('rejects a value missing the problem statement', () => {
    expect(isModwContent({ ...VALID_MODW_CONTENT, problem: undefined })).toBe(false);
  });

  it('rejects a value missing the core idea', () => {
    expect(isModwContent({ ...VALID_MODW_CONTENT, coreIdea: undefined })).toBe(false);
  });

  it('rejects a value with a malformed repositoryCta', () => {
    expect(isModwContent({ ...VALID_MODW_CONTENT, repositoryCta: { label: 'Only label' } })).toBe(
      false,
    );
  });

  it('rejects a value with a malformed consultingCta', () => {
    expect(isModwContent({ ...VALID_MODW_CONTENT, consultingCta: 'not-an-object' })).toBe(false);
  });

  it('rejects a value missing roles', () => {
    expect(isModwContent({ ...VALID_MODW_CONTENT, roles: undefined })).toBe(false);
  });

  it('rejects a value with malformed role entries', () => {
    expect(isModwContent({ ...VALID_MODW_CONTENT, roles: [{ id: 'moderator' }] })).toBe(false);
  });

  it('rejects a value missing projectEvidence', () => {
    expect(isModwContent({ ...VALID_MODW_CONTENT, projectEvidence: undefined })).toBe(false);
  });

  it('rejects a value with malformed projectEvidence entries', () => {
    expect(
      isModwContent({ ...VALID_MODW_CONTENT, projectEvidence: [{ id: 'mqtt-align' }] }),
    ).toBe(false);
  });

  it('rejects non-record values', () => {
    expect(isModwContent(null)).toBe(false);
    expect(isModwContent('not-an-object')).toBe(false);
    expect(isModwContent([])).toBe(false);
  });
});
