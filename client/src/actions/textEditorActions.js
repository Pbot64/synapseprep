// import axios from 'axios';

import { UPDATE_TEXT } from './types';

// Update text in editor
export const updateText = text => {
  return {
    type: UPDATE_TEXT,
    payload: text
  };
};
