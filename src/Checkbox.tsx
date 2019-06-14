import React from 'react';
import { Field, getIn, FieldProps } from 'formik';
import { Checkbox as PolarisCheckbox } from '@shopify/polaris';
import { BaseProps as PolarisCheckboxProps } from '@shopify/polaris/types/components/Checkbox/Checkbox';
import { Omit } from './types';

interface CheckboxProps {
  /**
   * The field identifier that formik can use to
   * connect this field to the data. Will also be
   * used as the polaris id
   */
  name: string;
}

type PolarisProps = Omit<
  PolarisCheckboxProps,
  'checked' | 'onChange' | 'onBlur' | 'error'
>;

function CheckboxField(props: CheckboxProps & PolarisProps) {
  const { name, ...polarisProps } = props;

  return (
    <Field
      name={name}
      render={({
        field,
        form: { setFieldValue, setFieldError, errors, touched },
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
            {...polarisProps}
            id={name}
            checked={field.value}
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

export default CheckboxField;
