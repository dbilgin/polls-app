import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/reducers';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import QuestionListScreen from './src/screens/QuestionListScreen';
import QuestionDetailScreen from './src/screens/QuestionDetailScreen';
import QuestionAddScreen from './src/screens/QuestionAddScreen';

export type RootStackParamList = {
  QuestionListScreen: undefined;
  QuestionDetailScreen: {questionId: number};
  QuestionAddScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="QuestionListScreen">
          <Stack.Screen
            name="QuestionListScreen"
            component={QuestionListScreen}
            options={{title: 'Question List'}}
          />
          <Stack.Screen
            name="QuestionDetailScreen"
            component={QuestionDetailScreen}
            options={{title: 'Question'}}
          />
          <Stack.Screen
            name="QuestionAddScreen"
            component={QuestionAddScreen}
            options={{title: 'Add Question'}}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
