import React from 'react';
import { Field, getIn, FieldProps } from 'formik';
import { Checkbox as PolarisCheckbox } from '@shopify/polaris';
import { BaseProps as PolarisCheckboxProps } from '@shopify/polaris/types/components/Checkbox/Checkbox';
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
            `Formik errors object is in an abnormal state, Checkbox "${name}" could not check it's error state`,
          );
        }

        return (
          <PolarisCheckbox
            disabled={isSubmitting}
            {...polarisProps}
            id={name}
            checked={decode ? decode(field.value) : field.value}
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

export default CheckboxField;
