import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import { AppFormField, AppForm, SubmitButton } from '../components/forms';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

const Register = () => {
  return (
    <Screen>
      <Image style={styles.logo} source={require('../assets/logo-red.png')} />
      <View style={styles.formContainer}>
        <AppForm
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={(values) => console.log(values)}
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
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 15,
    marginTop: 50,
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
