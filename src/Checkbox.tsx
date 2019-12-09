import React from 'react';
import { Checkbox as PolarisCheckbox } from '@shopify/polaris';
import { BaseProps as PolarisCheckboxProps } from '@shopify/polaris/types/components/Checkbox/Checkbox';
import { usePolarisField } from './usePolarisField';
import { Omit } from './types';

interface Props<V> extends PolarisCheckboxProps {
  /**
   * The field identifier that formik can use to
   * connect this field to the data. Will also be
   * used as the polaris id
   */
  name: string;

  /**
   * Optional helper to convert from
   * non-boolean values to a checked state
   */
  decode?: (value: V) => boolean;

  /**
   * Optional helper to convert from
   * current checked state to non-boolean value
   */
  encode?: (checked: boolean) => V;
}

export type CheckboxProps<V> = Omit<
  Props<V>,
  'id' | 'checked' | 'onChange' | 'onBlur' | 'onFocus' | 'error'
>;

function CheckboxField<V = any>(props: CheckboxProps<V>) {
  const { name, encode, decode, ...polarisProps } = props;

  const {
    value: rawValue,
    isSubmitting,
    handleFocus,
    handleBlur,
    handleChange,
    error,
  } = usePolarisField<V, boolean>({ name, encode, decode });

  const value = rawValue === undefined ? false : rawValue;
  if (typeof value !== 'boolean') {
    throw new Error(
      `Found value of type "${typeof value}" for field "${name}". Requires boolean (after decode)`,
    );
  }

  return (
    <PolarisCheckbox
      disabled={isSubmitting}
      {...polarisProps}
      id={name}
      checked={value}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      error={error}
    />
  );
}

export default CheckboxField;
