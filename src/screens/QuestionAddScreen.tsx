import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {addQuestion} from '../../PollsService';
import {debounce} from 'lodash';
import {FAB} from 'react-native-paper';
import {fetchQuestionSuccess} from '../store/actions';
import {Question} from '../../Models/Question';

type QuestionAddScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'QuestionAddScreen'
>;

type Props = {
  navigation: QuestionAddScreenNavigationProp;
};

const QuestionAddScreen: React.FC<Props> = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [choices, setChoices] = useState<string[]>([]);
  const dispatch = useDispatch();

  const cleanChoices = () => {
    return choices.filter((choice) => !!choice);
  };

  const add = async () => {
    const cleanedChoices = cleanChoices();

    if (
      !!title &&
      !!cleanedChoices &&
      !!cleanedChoices.length &&
      cleanedChoices.length >= 2
    ) {
      try {
        const addResult = await addQuestion(title, cleanedChoices);
        if (addResult.status === 201) {
          let newQuestion: Question = addResult.data;
          newQuestion.id = Number(newQuestion.url.split('/').pop());
          dispatch(fetchQuestionSuccess(newQuestion, newQuestion.id));
          navigation.goBack();
        } else {
          Alert.alert('An error has occurred.');
        }
      } catch {
        Alert.alert('An error has occurred.');
      }
    } else {
      Alert.alert('Enter all the fields.');
    }
  };

  const debounceSetTitle = debounce((text: string) => {
    setTitle(text);
  }, 500);

  const computeChoice = (choice: string, index: number) => {
    const newChoices = [...choices];
    newChoices[index] = choice;
    setChoices(newChoices);
  };

  const addChoice = () => {
    const newChoices = [...choices];
    newChoices.push('');
    setChoices(newChoices);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{padding: 24}}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => debounceSetTitle(text)}
          />
          <Text style={styles.titleText}>Choices</Text>
          {choices.map((__: string, index: number) => (
            <TextInput
              key={index.toString()}
              style={styles.input}
              onChangeText={(text) => computeChoice(text, index)}
            />
          ))}
          <TouchableOpacity style={{marginTop: 18}} onPress={addChoice}>
            <View style={styles.addChoiceButton}>
              <Text style={styles.buttonText}>Add New Choice</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FAB style={styles.fab} icon="content-save" onPress={() => add()} />
    </View>
  );
};

export default QuestionAddScreen;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0,
    backgroundColor: '#147efb',
  },
  addChoiceButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#147efb',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  titleText: {
    fontSize: 24,
    color: '#505b7d',
    marginTop: 18,
  },
  input: {
    marginTop: 8,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 16,
    paddingLeft: 12,
    paddingRight: 12,
  },
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
