export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type OmittedPolarisProps =
  | 'value'
  | 'onChange'
  | 'onBlur'
  | 'onFocus'
  | 'selected'
  | 'textField'
  | 'onSelect';
