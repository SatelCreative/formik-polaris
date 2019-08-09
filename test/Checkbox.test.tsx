/* eslint-env jest */
/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
import React, { ReactNode } from 'react';
import { Formik, FormikActions, Form } from 'formik';
import { render, cleanup } from './test-utils';
import { Checkbox } from '../src';

afterEach(cleanup);

interface BasicFormProps<V = any> {
  children: ReactNode;
  initialValues?: V;
  onSubmit?: (values: V, formikActions: FormikActions<V>) => void;
  formRef?: any;
}

function BasicForm<V = any>(props: BasicFormProps<V>) {
  const {
    initialValues = {} as V,
    onSubmit = () => {
      throw new Error('Submit not handled');
    },
    children,
    formRef,
  }: BasicFormProps<V> = props;

  return (
    <Formik<V> initialValues={initialValues} onSubmit={onSubmit} ref={formRef}>
      {() => <Form>{children}</Form>}
    </Formik>
  );
}

describe('<Checkbox />', () => {
  it('renders without crashing', async () => {
    const { getByLabelText } = render(
      <BasicForm>
        <Checkbox label="test" name="test" />
      </BasicForm>,
    );

    getByLabelText('test');
  });
});
