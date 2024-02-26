// src/reducers/index.js

import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  game: gameReducer,
  user: userReducer,
  // Add other reducers if needed
});

export default rootReducer;
