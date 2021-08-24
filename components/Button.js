import React from 'react';
import {StyleSheet, Text, TouchableHighlight, Switch, View} from 'react-native';

export const BasicButton = ({onPress, title}) => (
  <TouchableHighlight style={styles.button} onPress={() => onPress()}>
    <Text style={styles.text}>{title}</Text>
  </TouchableHighlight>
);

export const SwitchButton = ({title, initState, onPress}) => {
  const [isEnable, setToggle] = React.useState(initState);

  const changeSwitch = () => {
    onPress();
    setToggle(previousState => !previousState);
  };

  return (
    <View style={styles.switch}>
      <Text style={styles.title}>{title}</Text>
      <Switch
        style={styles.switchButton}
        ios_backgroundColor="#3e3e3e"
        onValueChange={changeSwitch}
        value={isEnable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#cc4523',
    width: '60%',
    padding: 10,
    margin: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
  },
  switch: {},
  title: {},
  switchButton: {},
});
