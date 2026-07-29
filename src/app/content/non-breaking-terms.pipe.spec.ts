import { NonBreakingTermsPipe } from './non-breaking-terms.pipe';

describe('NonBreakingTermsPipe', () => {
  const pipe = new NonBreakingTermsPipe();

  it('replaces MOD-W with a non-breaking hyphen for rendered copy', () => {
    expect(pipe.transform('Explore MOD-W methodology')).toBe('Explore MOD\u2011W methodology');
  });

  it('leaves empty values renderable', () => {
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform(null)).toBe('');
  });
});
