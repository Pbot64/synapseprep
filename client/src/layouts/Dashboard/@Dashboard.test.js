import React from 'react';
import { render, fireEvent, screen } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';
// import TestingDebug from './TestingDebug';

const HelloWorld = () => <h1>Hello World</h1>;

it('renders correctly', () => {
  const { debug } = render(<HelloWorld />);
  debug();
  expect(debug).toBeTruthy();
  console.log('this is a test');
});
