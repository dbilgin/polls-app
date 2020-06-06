import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {fetchQuestion} from '../store/actions';
import {RootState} from '../store/reducers';
import {Question} from '../Models/Question';
import QuestionCard from './QuestionCard';
import {SafeAreaView} from 'react-navigation';

const images = [
  require('../assets/1.png'),
  require('../assets/2.png'),
  require('../assets/3.png'),
];

export default function QuestionList() {
  const dispatch = useDispatch();
  const qs = useSelector((state: RootState) => state.questions);

  useEffect(() => {
    dispatch(fetchQuestion(1));
  }, [dispatch]);

  const renderFooter = () => {
    return (
      <View>
        {qs.isFetching ? (
          <ActivityIndicator color="black" style={{marginLeft: 8}} />
        ) : qs.error?.response?.status !== 404 ? (
          <TouchableOpacity style={styles.errorButton} onPress={requestNewPage}>
            <Text style={styles.loadText}>
              An error has occurred, press here to retry
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  const renderItem = ({item, index}: {item: Question; index: number}) => {
    let newIndex = index;
    while (newIndex > 2) {
      newIndex = newIndex - 3;
    }
    const randomImage = images[newIndex];
    return <QuestionCard q={item} image={randomImage} />;
  };

  const endReached = () => {
    if (qs.error?.response?.status !== 404) {
      requestNewPage();
    }
  };

  const requestNewPage = () => {
    const maxId = Math.max.apply(
      Math,
      qs.questions.map((o) => {
        return o.id ?? 0;
      }),
    );

    dispatch(fetchQuestion(maxId + 1));
  };

  return (
    <SafeAreaView style={{flex: 1}} forceInset={{top: 'always'}}>
      <View style={styles.container}>
        <FlatList
          style={{width: '100%'}}
          keyExtractor={(item, index) => item.url + index.toString()}
          data={[...qs.questions, ...qs.questions]}
          renderItem={renderItem}
          onEndReached={endReached}
          onEndReachedThreshold={0.1}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={renderFooter}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  errorButton: {
    height: 50,
    backgroundColor: '#137177',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadText: {
    color: 'white',
  },
});
