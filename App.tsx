import React from 'react';
import {Provider} from 'react-redux';
import store from './store/reducers';
import QuestionList from './components/QuestionList';

export default function App() {
  return (
    <Provider store={store}>
      <QuestionList />
    </Provider>
  );
}
