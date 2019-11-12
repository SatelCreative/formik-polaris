/* eslint-env jest */
import React, { ReactNode } from 'react';
import { Formik, FormikActions, Form } from 'formik';
import { render, cleanup } from './test-utils';
import { Select } from '../src';

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

describe('<Select />', () => {
  it('renders without crashing', async () => {
    const { getByLabelText } = render(
      <BasicForm>
        <Select label="test" name="test" options={['First', 'Second']} />
      </BasicForm>,
    );

    getByLabelText('test');
  });
});
