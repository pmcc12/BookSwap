import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {
  useFonts,
  Rosario_300Light,
  Rosario_400Regular,
  Rosario_500Medium,
  Rosario_600SemiBold,
  Rosario_700Bold,
  Rosario_300Light_Italic,
  Rosario_400Regular_Italic,
  Rosario_500Medium_Italic,
  Rosario_600SemiBold_Italic,
  Rosario_700Bold_Italic,
} from '@expo-google-fonts/rosario';
import AppLoading from 'expo-app-loading';

const AddBookToLibrary = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Rosario_300Light,
    Rosario_400Regular,
    Rosario_500Medium,
    Rosario_600SemiBold,
    Rosario_700Bold,
    Rosario_300Light_Italic,
    Rosario_400Regular_Italic,
    Rosario_500Medium_Italic,
    Rosario_600SemiBold_Italic,
    Rosario_700Bold_Italic,
  });
  const [title, setTitle] = useState(null);
  const [authors, setAuthors] = useState(null);
  const [isbn, setIsbn] = useState(null);

  function handleSubmit() {
    if (title === null && authors === null && isbn === null) {
      Alert.alert('Please enter some valid input in the field');
    } else {
      navigation.navigate('Select a Book From The List', {
        FormInfo: { title: title, authors: authors, isbn: isbn },
      });
      setTitle(null);
      setAuthors(null);
      setIsbn(null);
    }
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.header2}>
          Fill at least one field or scan the ISBN {'\n'}
          code with your camera
        </Text>
        <TextInput
          label="Title"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          mode="outlined"
        />
        <TextInput
          label="Author"
          style={styles.input}
          value={authors}
          onChangeText={setAuthors}
          mode="outlined"
        />
        <TextInput
          label="ISBN"
          style={styles.input}
          value={isbn}
          onChangeText={setIsbn}
          mode="outlined"
          // TODO set digit input instead of normal keyboard
        />
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.buttonSearch}
          labelStyle={{ fontSize: 16 }}
        >
          Search
        </Button>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => navigation.navigate('ScanISBN')}
          style={styles.buttonISBN}
          labelStyle={{ fontSize: 16 }}
          contentStyle={{ flexDirection: 'row-reverse' }}
        >
          Scan isbn
        </Button>
      </View>
    );
  }
};

export default AddBookToLibrary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  header2: {
    fontFamily: 'Rosario_400Regular_Italic',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  buttonISBN: {
    marginHorizontal: 20,
    marginTop: 170,
    padding: 10,
    fontSize: 20,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: '#5D3FD3',
  },
  buttonSearch: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: '#AA336A',
  },
});
