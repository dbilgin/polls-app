import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {fetchQuestion} from '../store/actions';
import {RootState} from '../store/reducers';
import {Question} from '../../Models/Question';
import QuestionCard from '../components/QuestionCard';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {FAB} from 'react-native-paper';
import {debounce} from 'lodash';
import Swiper from 'react-native-swiper';

const images = [
  require('../images/1.png'),
  require('../images/2.png'),
  require('../images/3.png'),
];

type QuestionListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'QuestionListScreen'
>;

type Props = {
  navigation: QuestionListScreenNavigationProp;
};

const QuestionListScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const qs = useSelector((state: RootState) => state.questions);

  useEffect(() => {
    dispatch(fetchQuestion(1));
    dispatch(fetchQuestion(2));
  }, [dispatch]);

  const renderFooter = () => {
    return (
      <SafeAreaView>
        <View style={{height: 50}}>
          {qs.isFetching ? (
            <ActivityIndicator color="black" />
          ) : !!qs.error && qs.error?.response?.status !== 404 ? (
            <TouchableOpacity
              style={styles.errorButton}
              onPress={() => debounceRequestNewPage()}>
              <Text style={styles.loadText}>
                An error has occurred, press here to retry
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </SafeAreaView>
    );
  };

  const renderItem = ({item, index}: {item: Question; index: number}) => {
    let newIndex = index;
    while (newIndex > 2) {
      newIndex = newIndex - 3;
    }
    const randomImage = images[newIndex];
    return (
      <QuestionCard
        key={item.url + 'card'}
        q={item}
        image={randomImage}
        navigation={navigation}
      />
    );
  };

  const endReached = () => {
    if (qs.error?.response?.status !== 404) {
      debounceRequestNewPage();
    }
  };

  const debounceRequestNewPage = debounce(() => {
    const maxId = Math.max.apply(
      Math,
      qs.questions.map((o) => {
        return o.id ?? 0;
      }),
    );

    dispatch(fetchQuestion(maxId + 1));
  }, 100);

  return (
    <View style={styles.container}>
      {qs.questions.length > 1 && (
        <Swiper
          loop={false}
          showsPagination={false}
          showsButtons={true}
          onIndexChanged={(index) => {
            if (qs.questions.length - (index + 1) < 1) {
              endReached();
            }
          }}>
          {qs.questions.map((question: Question, index: number) =>
            renderItem({item: question, index: index}),
          )}
        </Swiper>
      )}

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('QuestionAddScreen')}
      />
      {renderFooter()}
    </View>
  );
};

export default QuestionListScreen;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0,
    backgroundColor: '#147efb',
  },
  container: {
    backgroundColor: 'white',
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
