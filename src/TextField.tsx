import React from 'react';
import { Field, getIn, FieldProps } from 'formik';
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

  return (
    <Field name={name}>
      {({
        field,
        form: { setFieldValue, setFieldError, errors, touched, isSubmitting },
      }: FieldProps) => {
        let error;
        try {
          if (getIn(touched, name)) {
            error = getIn(errors, name);
          }
        } catch (e) {
          throw new Error(
            `Formik errors object is in an abnormal state, TextField "${name}" could not check it's error state`,
          );
        }

        return (
          <PolarisTextField
            disabled={isSubmitting}
            {...polarisProps}
            id={name}
            value={decode ? decode(field.value) : field.value}
            onFocus={() => setFieldError(name, '')}
            onBlur={() => field.onBlur({ target: { name } })}
            onChange={value => {
              setFieldValue(name, encode ? encode(value) : value);
            }}
            error={error}
          />
        );
      }}
    </Field>
  );
}

export default TextField;
