import React from 'react';
import { Checkbox as PolarisCheckbox } from '@shopify/polaris';
import { BaseProps as PolarisCheckboxProps } from '@shopify/polaris/types/components/Checkbox/Checkbox';
import { usePolarisField, UsePolarisFieldProps } from './usePolarisField';
import { Omit, OmittedPolarisProps } from './types';

type Props<V> = UsePolarisFieldProps<V, boolean> & PolarisCheckboxProps;

export type CheckboxProps<V> = Omit<Props<V>, OmittedPolarisProps>;

function CheckboxField<V = any>(props: CheckboxProps<V>) {
  const { name, encode, decode, validate, ...polarisProps } = props;

  const {
    value: rawValue,
    isSubmitting,
    handleFocus,
    handleBlur,
    handleChange,
    error,
  } = usePolarisField<V, boolean>({ name, encode, decode, validate });

  const value = rawValue === undefined ? false : rawValue;
  if (typeof value !== 'boolean') {
    throw new Error(
      `[Checkbox] Found value of type "${typeof value}" for field "${name}". Requires boolean (after decode)`,
    );
  }

  return (
    <PolarisCheckbox
      id={name}
      error={error}
      disabled={isSubmitting}
      {...polarisProps}
      checked={value}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
}

export default CheckboxField;
