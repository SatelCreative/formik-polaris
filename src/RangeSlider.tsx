import React from 'react';
import { RangeSlider as PolarisRangeSlider } from '@shopify/polaris';
import {
  RangeSliderProps as PolarisRangeSliderProps,
  RangeSliderValue,
} from '@shopify/polaris/types/components/RangeSlider';
import { usePolarisField, UsePolarisFieldProps } from './usePolarisField';
import { Omit, OmittedPolarisProps } from './types';

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
      disabled={isSubmitting}
      {...polarisProps}
      id={name}
      value={value}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      error={error}
    />
  );
}

export default RangeSlider;
