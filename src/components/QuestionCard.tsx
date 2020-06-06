import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Question} from '../../Models/Question';
import {sum} from '../utils';
import {RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';

interface CardProps {
  q: Question;
  image: ImageSourcePropType;
  navigation: StackNavigationProp<RootStackParamList, 'QuestionListScreen'>;
}

const QuestionCard: React.FC<CardProps> = ({q, image, navigation}) => {
  const navigateToDetail = () => {
    if (q.id) {
      navigation.navigate('QuestionDetailScreen', {questionId: q.id});
    } else {
      Alert.alert('An error has occurred.');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity onPress={navigateToDetail} style={styles.cardContainer}>
        <Image
          style={{flex: 0.5, width: '100%'}}
          resizeMode={'contain'}
          source={image}
        />
        <View style={{padding: 24, flex: 1}}>
          <Text style={styles.title}>{q.question}</Text>
          <Text style={styles.subtitle}>{q.url}</Text>
          <Text style={styles.dateText}>
            Published at: {new Date(q.published_at).toLocaleDateString()}
          </Text>
          <Text style={styles.bottomText}>{`This question has ${
            q.choices.length
          } choices and a total of ${sum(
            q.choices.map((x) => x.votes),
          )} votes. Press here now to vote!`}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({
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
    height: 500,
    width: '80%',
    margin: 20,
    borderWidth: 0,
    borderRadius: 18,
    justifyContent: 'center',
    alignSelf: 'center',
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
