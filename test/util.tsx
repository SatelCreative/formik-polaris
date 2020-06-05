import React, { ReactNode, RefObject } from 'react';
import { Formik, FormikHelpers, Form } from 'formik';

export interface BasicFormProps<V = any> {
  children: ReactNode;
  initialValues?: V;
  onSubmit?: (values: V, formikHelpers: FormikHelpers<V>) => void;
  formikRef?: RefObject<any>;
}

// eslint-disable-next-line import/prefer-default-export
export function BasicForm<V = any>(props: BasicFormProps<V>) {
  const {
    initialValues = {} as V,
    onSubmit = () => {
      throw new Error('Submit not handled');
    },
    children,
    formikRef,
  }: BasicFormProps<V> = props;

  return (
    <Formik<V> initialValues={initialValues} onSubmit={onSubmit}>
      {formik => {
        if (formikRef) {
          (formikRef as any).current = formik;
        }
        return <Form>{children}</Form>;
      }}
    </Formik>
  );
}
