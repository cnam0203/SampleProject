import React from 'react';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const ScreenContainer = ({theme, children}) => (
  // eslint-disable-next-line react-native/no-inline-styles
  <View style={[styles.container, {backgroundColor: theme ? '#000' : '#fff'}]}>
    {children}
  </View>
);
