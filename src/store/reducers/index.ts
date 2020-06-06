import {combineReducers, createStore, applyMiddleware} from 'redux';
import {questions} from './questions';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  questions,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
