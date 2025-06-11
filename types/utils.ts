
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type NonEmptyArray<T> = [T, ...T[]];

export type StringKeys<T> = Extract<keyof T, string>;

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Record<string, unknown>
    ? DeepReadonly<T[P]>
    : T[P];
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record<string, unknown>
    ? DeepPartial<T[P]>
    : T[P];
};

export type Nullish<T> = T | null | undefined;

export type NonNullish<T> = T extends null | undefined ? never : T;

export type SafeOmit<T, K extends keyof T> = Omit<T, K>;

export type SafePick<T, K extends keyof T> = Pick<T, K>;

export type Brand<T, B> = T & { readonly __brand: B };

export type Email = Brand<string, 'Email'>;
export type PhoneNumber = Brand<string, 'PhoneNumber'>;
export type URL = Brand<string, 'URL'>;
export type PositiveNumber = Brand<number, 'PositiveNumber'>;

export type AsyncReturnType<T extends (...args: readonly unknown[]) => Promise<unknown>> = 
  T extends (...args: readonly unknown[]) => Promise<infer R> ? R : never;

export interface Result<T, E = Error> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: E;
}

export const success = <T>(data: T): Result<T> => ({
  success: true,
  data,
});

export const failure = <E = Error>(error: E): Result<never, E> => ({
  success: false,
  error,
});

export type JSONValue = 
  | string 
  | number 
  | boolean 
  | null 
  | JSONValue[] 
  | { [key: string]: JSONValue };

export type JSONObject = { [key: string]: JSONValue };

export type Awaitable<T> = T | Promise<T>;

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
