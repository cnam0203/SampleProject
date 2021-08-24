import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {AppContext} from '../context/AppContext';
import {ScreenContainer} from './ScreenContainer';
import {BasicButton} from './Button';

export const LoginScreen = () => {
  const {signIn, authenTouchId} = React.useContext(AppContext);

  React.useEffect(() => {
    authenTouchId();
  });

  return (
    <ScreenContainer theme={false}>
      <Image
        source={require('../asset/images/logo2.png')}
        style={styles.logo}
      />
      <BasicButton onPress={signIn} title="Log In" />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 300,
    marginVertical: 50,
  },
});
