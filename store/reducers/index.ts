import {combineReducers, createStore} from 'redux';
import {questions} from './questions';

const rootReducer = combineReducers({
  questions,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);
export default store;
