import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store/reducers';
import {RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import ErrorView from '../components/ErrorView';
import {sum} from '../utils';
import {voteQuestion} from '../../PollsService';
import {updateVoteWithUrl} from '../store/actions';

type ProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  'QuestionDetailScreen'
>;

type QuestionDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'QuestionDetailScreen'
>;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: QuestionDetailScreenNavigationProp;
};

const QuestionDetailScreen: React.FC<Props> = ({route, navigation}) => {
  const dispatch = useDispatch();

  const {questionId} = route.params;
  const question = useSelector((state: RootState) =>
    state.questions.questions.find((x) => x.id === questionId),
  );

  const vote = async (choiceId: number, choiceUrl: string) => {
    if (choiceId && !!question?.id) {
      try {
        const voteResult = await voteQuestion(questionId, choiceId);
        if (voteResult.status === 201) {
          dispatch(updateVoteWithUrl(question.id, choiceUrl));
          navigation.goBack();
        } else {
          Alert.alert('An error has occurred.');
        }
      } catch {
        Alert.alert('An error has occurred.');
      }
    } else {
      Alert.alert('An error has occurred.');
    }
  };

  return !question ? (
    <ErrorView />
  ) : (
    <View style={styles.container}>
      <ScrollView>
        <View style={{padding: 24}}>
          <Text style={styles.title}>{question.question}</Text>
          <Text style={styles.subtitle}>{question.url}</Text>
          <Text style={styles.dateText}>
            Published at: {new Date(question.published_at).toLocaleDateString()}
          </Text>
          <Text style={styles.dateText}>{`This question has a total of ${sum(
            question.choices.map((x) => x.votes),
          )} votes.`}</Text>

          {question.choices.map((choice) => (
            <TouchableOpacity
              key={choice.url}
              onPress={() =>
                vote(Number(choice.url.split('/').pop()), choice.url)
              }
              style={styles.cardContainer}>
              <Text style={styles.choiceText}>{choice.choice}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default QuestionDetailScreen;

const styles = StyleSheet.create({
  choiceText: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  bottomText: {
    fontSize: 24,
    color: 'black',
    marginTop: 24,
  },
  dateText: {
    fontSize: 16,
    color: '#505b7d',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 12,
    color: '#505b7d',
    marginTop: 12,
  },
  title: {
    fontSize: 24,
    color: '#505b7d',
  },

  cardContainer: {
    margin: 18,
    height: 100,
    borderWidth: 0,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
