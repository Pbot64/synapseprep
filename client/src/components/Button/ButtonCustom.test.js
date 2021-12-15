import React from 'react';
import { render } from '../../utils/test-utils';

import ButtonCustom from './ButtonCustom';

it('should render a default button with text', () => {
  //   const testMessage = 'I am a button';
  //   const { getByText } = render(<ButtonCustom>{testMessage}</ButtonCustom>);

  //   const buttonElement = getByText(/I am a button/i);
  //   expect(buttonElement).toBeInTheDocument();

  const butonBasic = render(<ButtonCustom>I am a button</ButtonCustom>);

  expect(butonBasic).toMatchSnapshot();
});

it('should render a button with a right chevron', () => {
  // const chevron = 'right';
  // const { getByText } = render(<ButtonCustom chevron='right'>I am a button</ButtonCustom>);
  // expect(getByText('I am a button')).toBeInTheDocument();
});
