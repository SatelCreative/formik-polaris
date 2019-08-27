import React from 'react';
import { Field, getIn, FieldProps } from 'formik';
import { Select as PolarisSelect } from '@shopify/polaris';
import { BaseProps as PolarisSelectProps } from '@shopify/polaris/types/components/Select/Select';
import { Omit } from './types';

interface Props<V> extends PolarisSelectProps {
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

export type SelectProps<V> = Omit<
  Props<V>,
  'value' | 'onChange' | 'onBlur' | 'error'
>;

function SelectField<V = any>(props: SelectProps<V>) {
  const { name, encode, decode, ...polarisProps } = props;

  return (
    <Field
      name={name}
      render={({
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
            `Formik errors object is in an abnormal state, Select "${name}" could not check it's error state`,
          );
        }

        return (
          <PolarisSelect
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
    />
  );
}

export default SelectField;
