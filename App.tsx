import React from 'react';
import {Provider} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import store from './store/reducers';
import Homepage from './Homepage';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Homepage />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
