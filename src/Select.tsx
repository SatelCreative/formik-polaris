import React from 'react';
import {
  Select as PolarisSelect,
  SelectProps as PolarisSelectProps,
} from '@shopify/polaris';
import { Omit, OmittedPolarisProps } from './types';
import { UsePolarisFieldProps, usePolarisField } from './usePolarisField';

type Props<V> = UsePolarisFieldProps<V, string | undefined> &
  PolarisSelectProps;

export type SelectProps<V> = Omit<Props<V>, OmittedPolarisProps>;

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
      id={name}
      error={error}
      disabled={isSubmitting}
      {...polarisProps}
      value={value as string | undefined}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
}

export default SelectField;
