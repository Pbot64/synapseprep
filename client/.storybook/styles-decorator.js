import React from 'react';
import CustomThemeProvider from '../src/components/common/Theme';

const StylesDecorator = storyFn => {
  return <CustomThemeProvider>{storyFn()}</CustomThemeProvider>;
};

export default StylesDecorator;
