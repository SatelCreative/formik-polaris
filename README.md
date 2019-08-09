# Formik Polaris

This is a tiny library that improves how [formik](https://github.com/jaredpalmer/formik) and [@shopify/polaris](https://github.com/Shopify/polaris-react) work together

## Installation

```
npm install @satel/formik-polaris

yarn add @satel/formik-polaris
```

`formik-polaris` also requires the following to have been installed separately:
- [`react`](https://www.npmjs.com/package/react)
- [`formik`](https://www.npmjs.com/package/formik)
- [`@shopify/polaris`](https://www.npmjs.com/package/@shopify/polaris)

## Demo

[Codesandbox Example](https://codesandbox.io/s/satelformik-polaris-basic-example-m7u38)

## Usage

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form } from 'formik';
import { AppProvider, Card, Button } from '@shopify/polaris';
import { Checkbox, TextField, Select } from '@satel/formik-polaris';

enum Time {
  Today = 'today',
  Yesterday = 'yesterday',
  LastWeek = 'lastWeek',
}

const OPTIONS = [
  { label: 'Today', value: Time.Today },
  { label: 'Yesterday', value: Time.Yesterday },
  { label: 'Last 7 days', value: Time.LastWeek }
];

interface FormValues {
  title: string;
  published: boolean;
  time: Time;
}

function MyForm() {
  return (
    <Formik<FormValues>
      initialValues={{ title: '', published: false, time: Time.Today }}
      onSubmit={console.log}
    >
      {() => (
        <Form>
          <Card sectioned>
            <TextField label="Title" name="title" />
            <Checkbox label="Published" name="published" />
            <Select label="Time" name="time" options={OPTIONS} />
            <Button submit>Save</Button>
          </Card>
        </Form>
      )}
    </Formik>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<AppProvider><MyForm /></AppProvider>, rootElement);
```

## Licence

MIT - See [LICENSE](./LICENSE)