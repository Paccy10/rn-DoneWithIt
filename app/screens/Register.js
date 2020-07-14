import React, { Fragment } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import { AppFormField, AppForm, SubmitButton } from '../components/forms';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';
import useApi from '../hooks/useApi';
import ActivityIndicator from '../components/ActivityIndicator';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

const Register = () => {
  const registerApi = useApi(authApi.register);
  const loginApi = useApi(authApi.login);
  const { login } = useAuth();

  const handleSubmit = async (userInfo) => {
    const response = await registerApi.request(userInfo);

    if (!response.ok) {
      if (response.data) alert(response.data.error);
      else {
        alert('An unexpected error occured.');
        console.log(response);
      }
      return;
    }
    const { data: authToken } = await loginApi.request(
      userInfo.email,
      userInfo.password
    );
    login(authToken);
  };
  return (
    <Fragment>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen>
        <Image style={styles.logo} source={require('../assets/logo-red.png')} />
        <View style={styles.formContainer}>
          <AppForm
            initialValues={{ name: '', email: '', password: '' }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppFormField
              autoCapitalize='words'
              autoCorrect={false}
              icon='account'
              name='name'
              placeholder='Name'
              textContentType='emailAddress'
            />
            <AppFormField
              autoCapitalize='none'
              autoCorrect={false}
              icon='email'
              keyboardType='email-address'
              name='email'
              placeholder='Email'
              textContentType='name'
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
            <SubmitButton title='Register' />
          </AppForm>
        </View>
      </Screen>
    </Fragment>
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

export default Register;
