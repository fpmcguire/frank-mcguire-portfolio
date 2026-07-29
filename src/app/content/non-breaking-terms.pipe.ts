import { Pipe, PipeTransform } from '@angular/core';

const BREAKABLE_MODW = 'MOD-W';
const NON_BREAKING_MODW = 'MOD\u2011W';

@Pipe({
  name: 'nonBreakingTerms',
  standalone: true,
  pure: true,
})
export class NonBreakingTermsPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return value?.replaceAll(BREAKABLE_MODW, NON_BREAKING_MODW) ?? '';
  }
}
