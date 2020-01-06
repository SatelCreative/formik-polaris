import React from 'react';
import { Select as PolarisSelect } from '@shopify/polaris';
import { BaseProps as PolarisSelectProps } from '@shopify/polaris/types/components/Select/Select';
import { Omit } from './types';
import { UsePolarisFieldProps, usePolarisField } from './usePolarisField';

type Props<V> = UsePolarisFieldProps<V, string | undefined> &
  PolarisSelectProps;

export type SelectProps<V> = Omit<
  Props<V>,
  'value' | 'onChange' | 'onBlur' | 'error'
>;

function SelectField<V = any>(props: SelectProps<V>) {
  const { name, encode, decode, validate, ...polarisProps } = props;

  const {
    value,
    isSubmitting,
    handleFocus,
    handleBlur,
    handleChange,
    error,
  } = usePolarisField<V, string | undefined>({
    name,
    encode,
    decode,
    validate,
  });

  if (typeof value !== 'string' && value !== undefined) {
    throw new Error(
      `[Select] Found value of type "${typeof value}" for field "${name}". Requires string (after decode)`,
    );
  }

  return (
    <PolarisSelect
      disabled={isSubmitting}
      {...polarisProps}
      id={name}
      value={value as string | undefined}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      error={error}
    />
  );
}

export default SelectField;
