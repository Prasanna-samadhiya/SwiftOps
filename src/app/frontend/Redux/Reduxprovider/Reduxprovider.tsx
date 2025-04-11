// src/components/ReduxProvider.tsx
'use client';

import { Provider } from 'react-redux';// Adjust the path to your store
import { store } from '../Store/Store';

const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
