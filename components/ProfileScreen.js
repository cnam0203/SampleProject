import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {AppContext} from '../context/AppContext';
import {ScreenContainer} from './ScreenContainer';
import {BasicButton, SwitchButton} from './Button';

export const ProfileScreen = ({navigation}) => {
  const {
    signOut,
    userInfo,
    darkTheme,
    changeDarkTheme,
    isFingerPrint,
    changeFingerPrint,
  } = React.useContext(AppContext);

  const {email} = userInfo;

  return (
    <ScreenContainer theme={darkTheme}>
      <Text style={styles.profileContainer}>Email: {email}</Text>
      <SwitchButton
        title="Dark Theme"
        onPress={changeDarkTheme}
        initState={darkTheme}
      />
      <SwitchButton
        title="Activate fingerprint"
        onPress={changeFingerPrint}
        initState={isFingerPrint}
      />
      <BasicButton title="Sign Out" onPress={() => signOut()} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  profileContainer: {},
});
