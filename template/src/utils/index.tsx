import Toast from 'react-native-toast-message';

export const successMessage = (message: string) => {
  Toast.show({
    text1: '',
    type: 'success',
    text2: message,
    autoHide: true,
  });
};

export const errorMessage = (message: string) => {
  Toast.show({
    text1: '',
    type: 'error',
    text2: message,
    autoHide: true,
  });
};
