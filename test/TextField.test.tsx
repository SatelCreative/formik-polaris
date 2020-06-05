/* eslint-env jest */
import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';

import { matchMedia } from '@shopify/jest-dom-mocks';

import { FormikProps } from 'formik';
import { render, cleanup } from './test-utils';
import { TextField } from '../src';
import { BasicForm } from './util';

afterEach(cleanup);

describe('<TextField />', () => {
  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

  it('renders without crashing', async () => {
    const { getByLabelText } = render(
      <BasicForm>
        <TextField label="test" name="test" />
      </BasicForm>,
    );

    getByLabelText('test');
  });

  it('updates formik state', async () => {
    const ref = React.createRef<FormikProps<any>>();

    const { getByLabelText } = render(
      <BasicForm formikRef={ref}>
        <TextField label="text" name="text" />
      </BasicForm>,
    );

    await userEvent.type(getByLabelText('text'), 'Hello, World!');

    expect(getByLabelText('text')).toHaveAttribute('value', 'Hello, World!');
    expect(ref.current?.values).toEqual({ text: 'Hello, World!' });
  });

  it('encodes and decodes', async () => {
    const ref = React.createRef<FormikProps<any>>();

    function encode(raw: string) {
      return raw.toUpperCase();
    }

    function decode(value: string) {
      return value.toLowerCase();
    }

    const { getByLabelText } = render(
      <BasicForm formikRef={ref} initialValues={{ text: 'HELLO' }}>
        <TextField label="text" name="text" encode={encode} decode={decode} />
      </BasicForm>,
    );

    expect(getByLabelText('text')).toHaveAttribute('value', 'hello');
    expect(ref.current?.values).toEqual({ text: 'HELLO' });

    await act(async () => userEvent.clear(getByLabelText('text')));
    expect(getByLabelText('text')).toHaveAttribute('value', '');
    expect(ref.current?.values).toEqual({ text: '' });

    await userEvent.type(getByLabelText('text'), 'Hello, World!');
    expect(getByLabelText('text')).toHaveAttribute('value', 'hello, world!');
    expect(ref.current?.values).toEqual({ text: 'HELLO, WORLD!' });
  });
});
