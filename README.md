# Formik Polaris

This is a tiny library that improves how [formik](https://github.com/jaredpalmer/formik) and [@shopify/polaris](https://github.com/Shopify/polaris-react) work together

## Installation

```
npm install @satel/formik-polaris

yarn add @satel/formik-polaris
```

`formik-polaris` also requires the following to have been installed separately:
- [`react@>=16.8`](https://www.npmjs.com/package/react)
- [`formik@2`](https://www.npmjs.com/package/formik)
- [`@shopify/polaris@>=4.12`](https://www.npmjs.com/package/@shopify/polaris)

_if you need support for an older version, try out a `0.X.X` release_

## Demo

[Codesandbox Example](https://codesandbox.io/s/satelformik-polaris1-basic-example-i23ig)

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

## API

### Checkbox

```tsx
import { Checkbox } from '@satel/formik-polaris';

// ...

<Checkbox
  // Formik name (required)
  name="published"

  // Convert formik value to boolean (optional)
  decode={value => `${value}`}

  // Convert boolean to formik value (optional)
  decode={value => `${value}`}

  // Normal polaris Checkbox props
  {...props}
/>

```

### Textfield

```tsx
import { Textfield } from '@satel/formik-polaris';

// ...

<Textfield
  // Formik name (required)
  name="published"

  // Convert formik value to string (optional)
  decode={value => `${value}`}

  // Convert string to formik value (optional)
  decode={value => `${value}`}

  // Normal polaris Textfield props
  {...props}
/>

```

### Select

```tsx
import { Select } from '@satel/formik-polaris';

// ...

<Select
  // Formik name (required)
  name="published"

  // Convert formik value to string (optional)
  decode={value => `${value}`}

  // Convert string to formik value (optional)
  decode={value => `${value}`}

  // Normal polaris Textfield props
  {...props}
/>
```

### RangeSlider

```tsx
import { RangeSlider } from '@satel/formik-polaris';

// ...

<RangeSlider
  // Formik name (required)
  name="published"

  // Convert formik value to string (optional)
  decode={value => `${value}`}

  // Convert string to formik value (optional)
  decode={value => `${value}`}

  // Normal polaris RangeSlider props
  {...props}
/>
```

## Licence

MIT - See [LICENSE](./LICENSE)
