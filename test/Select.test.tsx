/* eslint-env jest */
import React from 'react';
import { matchMedia } from '@shopify/jest-dom-mocks';
import { render, cleanup } from './test-utils';
import { Select } from '../src';
import { BasicForm } from './util';

afterEach(cleanup);


describe('<Select />', () => {
  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

  it('renders without crashing', async () => {
    const { getByLabelText } = render(
      <BasicForm>
        <Select label="test" name="test" options={['First', 'Second']} />
      </BasicForm>,
    );

    getByLabelText('test');
  });
});
