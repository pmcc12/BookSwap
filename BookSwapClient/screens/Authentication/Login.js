import React, { useState, useContext } from 'react';
import { View, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import apiServiceJWT from '../../ApiServiceJWT';
import { UserContext } from '../../AuthContext';

const Login = ({ navigation }) => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSubmit = async (e) => {
    const user = { email, userPassword };
    const res = await apiServiceJWT.login(user);
    if (res.error) {
      alert(`${res.message}`);
      setEmail('');
      setUserPassword('');
    } else {
      const { accessToken, id } = res;
      login(accessToken, id);
    }
  };

  return (
    <View>
      <Text style={{ paddingBottom: 30, paddingTop: 30 }}>email</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'grey' }}
        value={email}
        onChangeText={setEmail}
      />
      <Text style={{ paddingBottom: 30, paddingTop: 30 }}>password</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'grey' }}
        value={userPassword}
        onChangeText={setUserPassword}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <View>
          <Text style={{ paddingBottom: 30, paddingTop: 30 }}>Submit!</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ paddingBottom: 30, paddingTop: 30 }}
        onPress={() => navigation.navigate('Register')}
      >
        <Text>Don't have an account? Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ paddingBottom: 30, paddingTop: 30 }}
        onPress={() => login('mario')}
      >
        <Text>Loggin in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
