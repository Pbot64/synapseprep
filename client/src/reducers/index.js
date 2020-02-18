// Node Modules
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// Reducers
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import questionReducer from './questionReducer';
import textEditorReducer from './textEditorReducer';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['auth', 'errors', 'question', 'textEditor']
};

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  question: questionReducer,
  textEditor: textEditorReducer
});

export default persistReducer(rootPersistConfig, rootReducer);
