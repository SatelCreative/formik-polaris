/* eslint-env jest */
import React, { ReactNode } from 'react';
import { Formik, FormikHelpers, Form } from 'formik';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/react';
import { matchMedia } from '@shopify/jest-dom-mocks';

import { render, cleanup } from './test-utils';
import { TextField } from '../src';

afterEach(cleanup);

interface BasicFormProps<V = any> {
  children: ReactNode;
  initialValues?: V;
  onSubmit?: (values: V, formikHelpers: FormikHelpers<V>) => void;
  formRef?: any;
}

function BasicForm<V = any>(props: BasicFormProps<V>) {
  const {
    initialValues = {} as V,
    onSubmit = () => {
      throw new Error('Submit not handled');
    },
    children,
  }: BasicFormProps<V> = props;

  return (
    <Formik<V> initialValues={initialValues} onSubmit={onSubmit}>
      {() => <Form>{children}</Form>}
    </Formik>
  );
}

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

    userEvent.type(input, str);

    expect((input as HTMLInputElement).value).toEqual(str);

    userEvent.click(button);

    await wait(() => expect(onSubmit).toHaveBeenCalledTimes(1));
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

    userEvent.type(input, toType);

    expect((input as HTMLInputElement).value).toEqual(toType);

    userEvent.click(button);

    await wait(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toEqual({ test: { hello: 0, there: 1 } });
  });
});
