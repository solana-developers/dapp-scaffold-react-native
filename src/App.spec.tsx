import * as React from 'react';
import {render} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import App from './App';

test('renders correctly', () => {
  const {getByTestId} = render(<App />);
  expect(getByTestId('heading')).toHaveTextContent('Hi 👋');
});
