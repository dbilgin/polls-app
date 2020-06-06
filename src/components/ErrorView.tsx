import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const ErrorView: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>An error has occurred.</Text>
    </View>
  );
};

export default React.memo(ErrorView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
