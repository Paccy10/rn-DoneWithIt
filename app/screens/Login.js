import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import { AppFormField, AppForm, SubmitButton } from '../components/forms';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

const Login = () => {
  const { login } = useAuth();
  const handleSubmit = async ({ email, password }) => {
    const response = await authApi.login(email, password);

    if (!response.ok) {
      return alert('Invalid email or password.');
    }

    login(response.data);
  };

  return (
    <Screen>
      <Image style={styles.logo} source={require('../assets/logo-red.png')} />
      <View style={styles.formContainer}>
        <AppForm
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='email'
            keyboardType='email-address'
            name='email'
            placeholder='Email'
            textContentType='emailAddress'
          />
          <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='lock'
            name='password'
            placeholder='Password'
            textContentType='password'
            secureTextEntry
          />
          <SubmitButton title='Login' />
        </AppForm>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 15,
    marginTop: 20,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
});

export default Login;
