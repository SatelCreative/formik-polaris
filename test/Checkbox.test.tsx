/* eslint-env jest */
import React from 'react';
import { matchMedia } from '@shopify/jest-dom-mocks';
import { render, cleanup } from './test-utils';
import { Checkbox } from '../src';
import { BasicForm } from './util';

afterEach(cleanup);

describe('<Checkbox />', () => {
  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

  it('renders without crashing', async () => {
    const { getByLabelText } = render(
      <BasicForm>
        <Checkbox label="test" name="test" />
      </BasicForm>,
    );

    getByLabelText('test');
  });

  // @todo figure out why onChecked never
  // fires in the test runner
});
