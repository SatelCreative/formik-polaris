/* eslint-env jest */
import React, { ReactNode } from 'react';
import { Formik, FormikHelpers, Form } from 'formik';
import { matchMedia } from '@shopify/jest-dom-mocks';
import { render, cleanup } from './test-utils';
import { Checkbox } from '../src';

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
});
