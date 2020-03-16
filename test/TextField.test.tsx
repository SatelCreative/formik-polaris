/* eslint-env jest */
import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, fireEvent } from '@testing-library/react';

import { matchMedia } from '@shopify/jest-dom-mocks';

import { render, cleanup } from './test-utils';
import { TextField } from '../src';
import { BasicForm } from './util';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { waitFor } = require('@testing-library/react');

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

  it('updates formik values when typed in', async () => {
    const onSubmit = jest.fn();
    const str = 'Hello there';

    const { getByLabelText, getByTestId } = render(
      <BasicForm onSubmit={onSubmit}>
        <TextField label="test" name="test" />
        <input type="submit" data-testid="submit" />
      </BasicForm>,
    );

    const input = getByLabelText('test');
    const button = getByTestId('submit');

    act(() => {
      userEvent.type(input, str);
    });

    expect((input as HTMLInputElement).value).toEqual(str);

    act(() => {
      userEvent.click(button);
    });

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toEqual({ test: str });
  });

  it('correctly encodes and decodes values', async () => {
    const onSubmit = jest.fn();
    const toType = 'hello,there';

    const { getByLabelText, getByTestId } = render(
      <BasicForm
        initialValues={{ test: { foo: 0, bar: 1 } }}
        onSubmit={onSubmit}
      >
        <TextField<{ [key: string]: number }>
          label="test"
          name="test"
          decode={val => Object.keys(val).join(',')}
          encode={str =>
            str
              .split(',')
              .map(s => s.trim())
              .reduce((acc, s, i) => ({ ...acc, [s]: i }), {})
          }
        />
        <input type="submit" data-testid="submit" />
      </BasicForm>,
    );

    const input = getByLabelText('test');
    const button = getByTestId('submit');

    expect((input as HTMLInputElement).value).toEqual('foo,bar');

    act(() => {
      fireEvent.change(input, { target: { value: '' } });
    });

    act(() => {
      userEvent.type(input, toType);
    });

    expect((input as HTMLInputElement).value).toEqual(toType);

    act(() => {
      userEvent.click(button);
    });

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toEqual({ test: { hello: 0, there: 1 } });
  });
});
