import React from 'react';
import { Field, getIn, FieldProps } from 'formik';
import { TextField as PolarisTextField } from '@shopify/polaris';
import { BaseProps as PolarisTextFieldProps } from '@shopify/polaris/types/components/TextField/TextField';
import { Omit } from './types';

interface TextFieldProps {
  /**
   * The field identifier that formik can use to
   * connect this field to the data. Will also be
   * used as the polaris id
   */
  name: string;
}

type PolarisProps = Omit<
  PolarisTextFieldProps,
  'value' | 'onChange' | 'onBlur' | 'error'
>;

function TextField(props: TextFieldProps & PolarisProps) {
  const { name, ...polarisProps } = props;

  return (
    <Field
      name={name}
      render={({
        field,
        form: { setFieldValue, setFieldError, errors, touched }
      }: FieldProps) => {
        let error;
        try {
          if (getIn(touched, name)) {
            error = getIn(errors, name);
          }
        } catch (e) {
          throw new Error(
            `Formik errors object is in an abnormal state, TextField "${name}" could not check it's error state`
          );
        }

        return (
          <PolarisTextField
            {...polarisProps}
            id={name}
            value={field.value}
            onFocus={() => setFieldError(name, '')}
            onBlur={() => field.onBlur({ target: { name } })}
            onChange={value => {
              setFieldValue(name, value);
            }}
            error={error}
          />
        );
      }}
    />
  );
}

export default TextField;
