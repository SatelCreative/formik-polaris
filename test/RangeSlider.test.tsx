/* eslint-env jest */
import React from 'react';
import { matchMedia } from '@shopify/jest-dom-mocks';
import { render, cleanup } from './test-utils';
import { RangeSlider } from '../src';
import { BasicForm } from './util';

afterEach(cleanup);

describe('<RangeSlider />', () => {
  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

  it('renders without crashing', async () => {
    const { getByLabelText } = render(
      <BasicForm initialValues={{test: 10}}>
        <RangeSlider label="test" name="test" />
      </BasicForm>,
    );

    getByLabelText('test');
  });
});
