import React, { FC } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { CustomTextInputProps } from '../../types';

const CustomTextInput: FC<CustomTextInputProps> = ({
  width = '100%',
  padding = 10,
  borderColor = 'black',
  borderWidth = 1,
  borderRadius = 8,
  style,
  ...rest
}) => {
  return (
    <TextInput
      style={[
        styles.input,
        {
          width: width as any,
          padding,
          borderColor,
          borderWidth,
          borderRadius,
        },
        style,
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    color: '#000',
  },
});

export default CustomTextInput;
