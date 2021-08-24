import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {AuthContext} from '../context/AppContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

const ScreenContainer = ({children}) => (
  <View style={styles.container}>{children}</View>
);

export const Home = ({navigation}) => (
  <ScreenContainer>
    <Text>Master List Screen</Text>
    <Button
      title="Detail1"
      onPress={() => navigation.push('Details', {name: 'Gold'})}
    />
    <Button title="Detail2" onPress={() => {}} />
    <Button title="Drawer" onPress={() => {}} />
  </ScreenContainer>
);

export const Details = ({route}) => (
  <ScreenContainer>
    <Text>Details Screen {route.params.name}</Text>
  </ScreenContainer>
);

export const Profile = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  return (
    <ScreenContainer>
      <Text>Profile</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
    </ScreenContainer>
  );
};

export const Search = ({navigation}) => (
  <ScreenContainer>
    <Text>Search Screen</Text>
    <Button
      title="Home"
      onPress={() =>
        navigation.navigate('Home', {
          screen: 'Details',
          params: {
            name: 'Pot',
          },
        })
      }
    />
    <Button title="Search2" onPress={() => navigation.push('Search2')} />
  </ScreenContainer>
);

export const Search2 = () => (
  <ScreenContainer>
    <Text>Search2 Screen</Text>
  </ScreenContainer>
);

export const SignIn = ({navigation}) => {
  const {signIn} = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Sign In Screen</Text>
      <Button title="Sign In" onPress={() => signIn('1234', 'Chấn Nam')} />
      <Button title="Create Account" onPress={() => {}} />
    </ScreenContainer>
  );
};

export const SignUp = ({navigation}) => {
  return (
    <ScreenContainer>
      <Text>Sign Up Screen</Text>
      <Button title="Sign Up" onPress={() => {}} />
    </ScreenContainer>
  );
};
