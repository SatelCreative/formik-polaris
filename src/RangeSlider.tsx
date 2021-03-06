import React from 'react';
import {
  RangeSlider as PolarisRangeSlider,
  RangeSliderProps as PolarisRangeSliderProps,
} from '@shopify/polaris';
import { usePolarisField, UsePolarisFieldProps } from './usePolarisField';
import { Omit, OmittedPolarisProps } from './types';

export type RangeSliderValue = PolarisRangeSliderProps['value'];

type Props<V> = UsePolarisFieldProps<V, RangeSliderValue> &
  PolarisRangeSliderProps;

export type RangeSliderProps<V = any> = Omit<Props<V>, OmittedPolarisProps>;

function RangeSlider<V = any>(props: RangeSliderProps<V>) {
  const { name, encode, decode, validate, ...polarisProps } = props;

  const {
    value: rawValue,
    isSubmitting,
    handleFocus,
    handleBlur,
    handleChange,
    error,
  } = usePolarisField<V, RangeSliderValue>({ name, encode, decode, validate });

  const value = rawValue === undefined ? '' : rawValue;
  if (typeof value !== 'number' && !Array.isArray(value)) {
    throw new Error(
      `[RangeSlider] Found value of type "${typeof value}" for field "${name}". Requires number or [number, number] (after decode)`,
    );
  }

  return (
    <PolarisRangeSlider
      id={name}
      error={error}
      disabled={isSubmitting}
      {...polarisProps}
      value={value}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
}

export default RangeSlider;
