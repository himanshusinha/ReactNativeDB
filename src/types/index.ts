import { TextInputProps } from 'react-native';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Add: undefined;
  AsyncStore: undefined;
};
export interface ButtonProps {
  title: string;
  onPress?: () => void;
  width?: number | string;
  backgroundColor?: string;
  padding?: number;
}
export interface CustomTextInputProps extends TextInputProps {
  width?: number | string;
  padding?: number;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
}
export type Contact = {
  name: string;
  mobile: string;
};
