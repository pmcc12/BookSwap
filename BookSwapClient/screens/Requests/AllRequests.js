import React, { useState, useEffect, useContext, useCallback } from 'react';
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
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../AuthContext';
import DisplaySingleRequest from '../../components/displaySingleRequest';
import {API_BASE_URL} from "@env"

const AllRequests = ({ route, navigation }) => {
  const { user } = useContext(UserContext);
  const isFocused = useIsFocused();
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [madeRequests, setMadeRequests] = useState([]);

  async function controlForRequests() {
    const response = await fetch(`${API_BASE_URL}/requests/${user.id}`);
    const json = await response.json();
    const filteredIncomingRequests = json.filter(
      (request) => request.userFrom !== user.id,
    );
    const filteredMadeRequests = json.filter(
      (request) => request.userFrom === user.id,
    );
    setIncomingRequests(filteredIncomingRequests);
    setMadeRequests(filteredMadeRequests);
  }

  useEffect(() => {
    if (isFocused) controlForRequests();
  }, [isFocused]);

  function removeNotificationBadgeReceiver(whatever) {
    if (!whatever.hasBeenViewed) {
      fetch(
        `${API_BASE_URL}/requests/${whatever.userTo}/${whatever.userFrom}/receiver/true`,
        {
          method: 'PUT',
        },
      ).catch((err) => console.log(err));
    }
  }

  function removeNotificationBadgeSender(whatever) {
    if (whatever.hasBeenViewed) {
      fetch(
        `${API_BASE_URL}/requests/${whatever.userFrom}/${whatever.userTo}/sender/false`,
        {
          method: 'PUT',
        },
      ).catch((err) => console.log(err));
    }
  }

  return (
    <ScrollView style={styles.container}>
      {incomingRequests.map((req) => (
        <DisplaySingleRequest
          info={req}
          pressing={() => {
            removeNotificationBadgeReceiver(req);
            navigation.navigate('Details of the Request', {
              request: req,
            });
          }}
          key={req.timeStamp}
        />
      ))}
      {madeRequests.map((req) => (
        <DisplaySingleRequest
          info={req}
          user={user.id}
          pressing={() => {
            removeNotificationBadgeSender(req);
            navigation.navigate('Details of the Request', {
              request: req,
            });
          }}
          key={req.timeStamp}
        />
      ))}
    </ScrollView>
  );
};

export default AllRequests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
