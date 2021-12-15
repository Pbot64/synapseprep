// Node Modules
import React from 'react';
import ReactDOM from 'react-dom';

// Local Components
import App from './App';
import CustomThemeProvider from './components/common/Theme';
import './index.css';
import * as serviceWorker from './serviceWorker';

// Local Assets

ReactDOM.render(
  <CustomThemeProvider>
    <App />
  </CustomThemeProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
