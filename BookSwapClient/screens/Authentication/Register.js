import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import apiServiceJWT from '../../ApiServiceJWT';
import { UserContext } from '../../AuthContext';
import { TextInput, Button } from 'react-native-paper';

const Register = () => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSubmit = async (e) => {
    const user = { username, email, userPassword };
    const res = await apiServiceJWT.register(user);
    setUsername('');
    setEmail('');
    setUserPassword('');
    console.log(res);
    if (res.error) {
      alert(`${res.message}`);
    } else {
      const { accessToken, id } = res;
      login(accessToken, id);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        mode="outlined"
      />
      <TextInput
        label="email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        mode="outlined"
      />
      <TextInput
        label="password"
        style={styles.input}
        value={userPassword}
        onChangeText={setUserPassword}
        mode="outlined"
        secureTextEntry={true}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.buttonRegister}
        labelStyle={{ fontSize: 16 }}
      >
        Register
      </Button>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 200,
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 2,
  },
  buttonRegister: {
    marginHorizontal: 20,
    marginTop: 50,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: '#5D3FD3',
  },
});
