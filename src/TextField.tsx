import React, { useEffect, useCallback } from 'react';
import {
  Field,
  getIn,
  FieldProps,
  useField,
  useFormik,
  useFormikContext,
} from 'formik';
import { TextField as PolarisTextField } from '@shopify/polaris';
import { BaseProps as PolarisTextFieldProps } from '@shopify/polaris/types/components/TextField/TextField';
import { Omit } from './types';

interface Props<V> extends PolarisTextFieldProps {
  /**
   * The field identifier that formik can use to
   * connect this field to the data. Will also be
   * used as the polaris id
   */
  name: string;

  /**
   * Optional helper to convert from
   * non-string values to a string
   */
  decode?: (value: V) => string;

  /**
   * Optional helper to convert from
   * current string value to non-string value
   */
  encode?: (checked: string) => V;
}

export type TextFieldProps<V> = Omit<
  Props<V>,
  'id' | 'value' | 'onChange' | 'onBlur' | 'onFocus' | 'error'
>;

function TextField<V = any>(props: TextFieldProps<V>) {
  const { name, encode, decode, ...polarisProps } = props;

  // Modified from https://github.com/jaredpalmer/formik/blob/5553720b5d6c9729cb3b12fd7948f28ad3be9adc/src/Field.tsx#L74

  const {
    registerField,
    unregisterField,
    getFieldProps,
    getFieldMeta,
    isSubmitting,
    setFieldError,
    setFieldValue,
  } = useFormikContext<any>();

  useEffect(() => {
    if (name) {
      registerField(name, { validate: undefined });
    }
    return () => {
      if (name) {
        unregisterField(name);
      }
    };
  }, [registerField, unregisterField, name]);

  const field = getFieldProps({ name });
  const meta = getFieldMeta(name);

  const rawValue = decode ? decode(field.value) : field.value;
  const value = rawValue === undefined ? '' : rawValue;

  if (typeof value !== 'string') {
    throw new Error(
      `Found value of type "${typeof value}" for field "${name}". Requires string (after decode)`,
    );
  }

  const handleFocus = useCallback(() => {
    setFieldError(name, '');
  }, [name, setFieldError]);

  const handleBlur = useCallback(() => {
    field.onBlur({ target: { name } });
  }, [field, name]);

  const handleChange = useCallback(
    (v: string) => {
      setFieldValue(name, encode ? encode(v) : v);
    },
    [encode, name, setFieldValue],
  );

  return (
    <PolarisTextField
      disabled={isSubmitting}
      {...polarisProps}
      id={name}
      value={value}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      error={meta.error}
    />
  );
}

export default TextField;
