import React from 'react';
import {Text} from 'react-native';
import {ScreenContainer} from './ScreenContainer';
import {BasicButton} from './Button';

const TestComponent = ({number}) => {
  return <Text>{number}</Text>;
};

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticate: false,
    };

    this._pressHandler = this._pressHandler.bind(this);
  }

  render() {
    return (
      <ScreenContainer>
        {this.state.isAuthenticate ? (
          <TestComponent number="HomeScreen" />
        ) : (
          <BasicButton title="Touch ID verify" onPress={this._pressHandler} />
        )}
      </ScreenContainer>
    );
  }
}

export default HomeScreen;
