import React from 'react';
import { Keyboard, Alert } from 'react-native';
import * as Yup from 'yup';

import messagesApi from '../api/messages';
import { Notifications } from 'expo';
import { AppForm, AppFormField, SubmitButton } from './forms';

const ContactSellerForm = ({ listing }) => {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();
    const response = await messagesApi.send(message, listing.id);
    if (!response.ok) {
      console.log('Error', response);
      return Alert.alert('Error', 'Could not send the message to the seller.');
    }

    resetForm();

    Notifications.presentLocalNotificationAsync({
      title: 'Awesome!',
      body: 'You message was sent to the seller',
    });
  };
  return (
    <AppForm
      initialValues={{ message: '' }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <AppFormField
        maxLength={255}
        multiline
        name='message'
        numberOfLines={3}
        placeholder='Message...'
      />
      <SubmitButton title='Contact Seller' />
    </AppForm>
  );
};

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label('Message'),
});

export default ContactSellerForm;
