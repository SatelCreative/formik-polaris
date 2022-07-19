import React from 'react';
import {
  Autocomplete as PolarisAutocomplete,
  AutocompleteProps as PolarisAutocompleteProps,
  TextFieldProps as PolarisTextFieldProps,
} from '@shopify/polaris';
import { usePolarisField, UsePolarisFieldProps } from './usePolarisField';
import { Omit, OmittedPolarisProps } from './types';

type Props<V> = UsePolarisFieldProps<V, string> &
  PolarisAutocompleteProps &
  PolarisTextFieldProps;
export type AutocompleteProps<V = any> = Omit<
  Props<V>,
  'allowMultiple' | OmittedPolarisProps
>;

function Autocomplete<V = any>(props: AutocompleteProps<V>) {
  const {
    name,
    options,
    id,
    encode,
    decode,
    validate,
    ...polarisProps
  } = props;

  const {
    value,
    isSubmitting,
    handleFocus,
    handleBlur,
    handleChange,
    handleSelect,
    error,
    optionsValues,
  } = usePolarisField<V, string>({ name, encode, decode, validate, options });

  if (typeof value !== 'string' && value !== undefined) {
    throw new Error(
      `[Autocomplete] Found value of type "${typeof value}" for field "${name}". Requires string (after decode)`,
    );
  }

  const textField = (
    <PolarisAutocomplete.TextField
      id={id}
      error={error}
      disabled={isSubmitting}
      {...polarisProps}
      value={value as string}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );

  return (
    <PolarisAutocomplete
      onSelect={handleSelect}
      options={optionsValues}
      selected={[]}
      textField={textField}
    />
  );
}

export default Autocomplete;
