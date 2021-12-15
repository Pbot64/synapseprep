import React from 'react';
import { action } from '@storybook/addon-actions';
import {
  text,
  boolean,
  number,
  select,
  optionsKnob as options,
  withKnobs,
  radios
} from '@storybook/addon-knobs';

import ButtonCustom from './ButtonCustom';

export default {
  title: 'ButtonCustom',
  component: ButtonCustom
};

// export const DynamicText = () => (
//   <ButtonCustom onClick={action('clicked')} chevron='right'>
//     {text('Label', 'Edit the Text')}
//   </ButtonCustom>
// );

// DynamicText.story = { name: 'Testing A Name' };

// const label2 = 'Age';
// const defaultValue = 28;
// const groupId = 'GROUP-ID1';

export const Button = () => {
  // Chevron Options
  const chevrons = ['right', 'left'];
  const chevronOptions = options('Chevrons', chevrons, 'none', { display: 'inline-radio' });

  // Size Options
  const sizeValues = { small: 'small', medium: 'medium', large: 'large' };
  const sizeOptions = options('Sizes', sizeValues, 'small', { display: 'select' });

  return (
    <ButtonCustom
      onClick={action('clicked')}
      disabled={boolean('Disabled', false)}
      size={sizeOptions}
      chevron={chevronOptions}
    >
      Button w/ Chevron
    </ButtonCustom>
  );
};

// export const buttonTesting = () => {
//   const label = 'Colors';
//   const valuesSelect = { small: 'small', medium: 'medium', large: 'large' };
//   const defaultValue = { small: 'small' };
//   const optionSelect = options('Select2', valuesSelect, 'small', { display: 'select' });

//   // const value = select(label, valuesObj, defaultValue, { display: 'select' });
//   return (
//     <ButtonCustom onClick={action('clicked')} size={optionSelect}>
//       This is a test
//     </ButtonCustom>
//   );
// };

// export const asDynamicVariables = () => {
//   const name = text('Name', 'James');
//   const age = number('Age', 35);
//   const value = select(label, options, defaultValue);
//   const content = `I am ${name} and I'm ${age} years old.`;

//   return <div>{content}</div>;
// };
