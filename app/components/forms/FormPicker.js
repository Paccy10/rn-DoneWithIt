import React, { Fragment } from 'react';
import { useFormikContext } from 'formik';

import AppPicker from '../Picker';
import ErrorMessage from './ErrorMessage';

const AppFormPicker = ({
  items,
  name,
  numberOfColums,
  PickerItemComponent,
  placeholder,
  width,
}) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
    <Fragment>
      <AppPicker
        items={items}
        numberOfColums={numberOfColums}
        onSelectItem={(item) => setFieldValue(name, item)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </Fragment>
  );
};

export default AppFormPicker;
