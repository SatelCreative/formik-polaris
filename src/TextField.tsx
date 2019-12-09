import React from 'react';
import { TextField as PolarisTextField } from '@shopify/polaris';
import { BaseProps as PolarisTextFieldProps } from '@shopify/polaris/types/components/TextField/TextField';
import { usePolarisField, UsePolarisFieldProps } from './usePolarisField';
import { Omit } from './types';

type Props<V> = UsePolarisFieldProps<V, string> & PolarisTextFieldProps;

export type TextFieldProps<V = any> = Omit<
  Props<V>,
  'id' | 'value' | 'onChange' | 'onBlur' | 'onFocus' | 'error'
>;

function TextField<V = any>(props: TextFieldProps<V>) {
  const { name, encode, decode, ...polarisProps } = props;

  const {
    value: rawValue,
    isSubmitting,
    handleFocus,
    handleBlur,
    handleChange,
    error,
  } = usePolarisField<V, string>({ name, encode, decode });

  const value = rawValue === undefined ? '' : rawValue;
  if (typeof value !== 'string') {
    throw new Error(
      `Found value of type "${typeof value}" for field "${name}". Requires string (after decode)`,
    );
  }

  return (
    <PolarisTextField
      disabled={isSubmitting}
      {...polarisProps}
      id={name}
      value={value}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      error={error}
    />
  );
}

export default TextField;
