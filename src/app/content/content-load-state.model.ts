export type ContentLoadState<T> =
  | { status: 'loading'; data: null; error: null }
  | { status: 'ready'; data: T; error: null }
  | { status: 'empty'; data: T; error: null }
  | { status: 'error'; data: null; error: string };
