// eslint-disable-next-line import/prefer-default-export
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
