import { addDecorator, configure } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import StylesDecorator from './styles-decorator';

addDecorator(StylesDecorator);
addDecorator(withKnobs);

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.js$/), module);
