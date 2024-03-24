import { ToastAndroid, Platform, Alert } from 'react-native';
function notifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(JSON.stringify(msg), ToastAndroid.SHORT);
  } else {
    Alert.alert(JSON.stringify(msg));
  }
}
export default notifyMessage;
