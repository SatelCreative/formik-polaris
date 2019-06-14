import React from 'react';
import { Field, getIn, FieldProps } from 'formik';
import { Select as PolarisSelect } from '@shopify/polaris';
import { BaseProps as PolarisSelectProps } from '@shopify/polaris/types/components/Select/Select';
import { Omit } from './types';

interface SelectProps {
  /**
   * The field identifier that formik can use to
   * connect this field to the data. Will also be
   * used as the polaris id
   */
  name: string;
}

type PolarisProps = Omit<
  PolarisSelectProps,
  'value' | 'onChange' | 'onBlur' | 'error'
>;

function SelectField(props: SelectProps & PolarisProps) {
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
            `Formik errors object is in an abnormal state, Select "${name}" could not check it's error state`
          );
        }

        return (
          <PolarisSelect
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

export default SelectField;
