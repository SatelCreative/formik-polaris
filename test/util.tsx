import React, { ReactNode } from 'react';
import { Formik, FormikHelpers, Form } from 'formik';

export interface BasicFormProps<V = any> {
  children: ReactNode;
  initialValues?: V;
  onSubmit?: (values: V, formikHelpers: FormikHelpers<V>) => void;
  formRef?: any;
}

// eslint-disable-next-line import/prefer-default-export
export function BasicForm<V = any>(props: BasicFormProps<V>) {
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
