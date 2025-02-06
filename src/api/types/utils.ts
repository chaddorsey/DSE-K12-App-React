/**
 * Type utilities for API endpoints
 */

type Join<K, P> = K extends string | number ?
  P extends string | number ?
    `${K}${'' extends P ? '' : '.'}${P}`
    : never : never;

type Prev = [never, 0, 1, 2, 3, 4, ...0[]];

export type PathsOf<T, D extends number = 3> = [D] extends [never] ? never : T extends object ?
  { [K in keyof T]: K extends string | number ?
      `${K}` | Join<K, PathsOf<T[K], Prev[D]>>
      : never
  }[keyof T] : '';

export type ExtractResponse<T, P extends string> = P extends keyof T ?
  T[P] extends { response: unknown } ? T[P]['response'] :
  T[P] extends object ? ExtractResponse<T[P], Exclude<PathsOf<T[P]>, keyof any[]>> :
  never : never;

export type ExtractBody<T, P extends string> = P extends keyof T ?
  T[P] extends { body: unknown } ? T[P]['body'] :
  T[P] extends object ? ExtractBody<T[P], Exclude<PathsOf<T[P]>, keyof any[]>> :
  never : never;

export type ExtractParams<T, P extends string> = P extends keyof T ?
  T[P] extends { params: unknown } ? T[P]['params'] :
  T[P] extends object ? ExtractParams<T[P], Exclude<PathsOf<T[P]>, keyof any[]>> :
  never : never;

export type ExtractMethod<T, P extends string> = P extends keyof T ?
  T[P] extends { method: string } ? T[P]['method'] :
  T[P] extends object ? ExtractMethod<T[P], Exclude<PathsOf<T[P]>, keyof any[]>> :
  never : never; 