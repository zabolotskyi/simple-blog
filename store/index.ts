import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import postReducer from './reducer';

export const rootReducer = combineReducers({
  posts: postReducer
})

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));
