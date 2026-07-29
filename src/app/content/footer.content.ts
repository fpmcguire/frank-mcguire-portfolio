export interface FooterContent {
  readonly copyright: string;
  readonly attribution: string;
}

export const FOOTER_CONTENT = {
  copyright: '© 2026 Frank McGuire',
  attribution: 'Built with MOD-W · Angular v21',
} as const satisfies FooterContent;
