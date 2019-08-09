import React, { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { AppProvider } from '@shopify/polaris';

const Provider = ({ children }: { children: ReactNode }) => {
  return <AppProvider>{children}</AppProvider>;
};

const customRender = (
  ui: React.ReactElement<any>,
  options: Omit<RenderOptions, 'queries'> = {},
) => render(ui, { wrapper: Provider as any, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
