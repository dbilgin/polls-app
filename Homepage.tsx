import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View, Text} from 'react-native';
import {RootState} from './store/reducers';
import {fetchQuestion} from './store/actions';

export default function Homepage() {
  const dispatch = useDispatch();
  const qs = useSelector((state: RootState) => state.questions);
  useEffect(() => {
    dispatch(fetchQuestion(1));
  });

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(qs)}</Text>
    </View>
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
