import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
} from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../AuthContext';
import DisplaySingleRequest from '../../components/displaySingleRequest';
import {API_BASE_URL} from "@env"

const AllMessages = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const { user } = useContext(UserContext);
  const [allMessages, setAllMessages] = useState([]);

  async function fetchMessagesFromDb() {
    try {
      let response = await fetch(`${API_BASE_URL}/messages/${user.id}`);
      let json = await response.json();
      setAllMessages(json);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchMessagesFromDb();
  }, [isFocused]);

  function turnOffTheNotification(otherUser) {
    fetch(`${API_BASE_URL}/messages/${user.id}/${otherUser}/false/notification`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={allMessages}
        keyExtractor={(item) => item.otherUser}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <TouchableOpacity
              onPress={() => {
                if (item.notification) {
                  turnOffTheNotification(item.otherUser);
                }
                navigation.navigate('Chat', {
                  messages: item,
                  otherUser: item.otherUser,
                });
              }}
            >
              <LinearGradient
                colors={
                  item.notification
                    ? ['#c32f27', '#d8572a']
                    : ['#5D3FD3', '#AA336A']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
              >
                <Text style={styles.text}>{item.otherUsername}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardContainer: {
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    zIndex: -5,
  },
  card: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    padding: 6,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Rosario_500Medium',
    fontSize: 17,
    padding: 20,
  },
});

export default AllMessages;
