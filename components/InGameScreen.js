import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Alert,
} from 'react-native';
import {AppContext} from '../context/AppContext';
import {ScreenContainer} from './ScreenContainer';

class Accordian extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    const {title, child, navigation} = this.props;

    return (
      <View style={styles.accordion}>
        <TouchableOpacity
          ref={this.accordian}
          style={styles.row}
          onPress={() => this.toggleExpand()}>
          <Text style={[styles.title, styles.font]}>{title}</Text>
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {this.state.expanded && (
          <View style={styles.childContainer}>
            {child.map((item, index) => (
              <Button
                key={index}
                style={styles.child}
                title={item.name}
                onPress={() =>
                  navigation.push('Chart', {
                    game: title,
                    report: item.name,
                    api: item.uri,
                  })
                }
              />
            ))}
          </View>
        )}
      </View>
    );
  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  };
}

export default class InGameScreen extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      menu: null,
    };

    this.onGetMenu = this.onGetMenu.bind(this);
    this.convertMenuTree = this.convertMenuTree.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
  }

  renderMenu() {
    const {navigation} = this.props;
    const {menu} = this.state;

    return (
      <View style={styles.accordionContainer}>
        {Object.keys(menu).map((item, index) => (
          <Accordian
            navigation={navigation}
            title={item}
            child={menu[item]}
            key={index}
          />
        ))}
      </View>
    );
  }

  convertMenuTree(menu) {
    let tree = {};

    menu.map(item => {
      if (!tree[item.report_name]) {
        tree[item.report_name] = [];
      }
      tree[item.report_name].push({name: item.name, uri: item.uri});
    });

    return tree;
  }

  onGetMenu() {
    const {signOut, fetchRequest} = this.context;
    let url = '/get-menu';

    fetchRequest(url).then(res => {
      if (res.status) {
        let menu = this.convertMenuTree(res.data.menu);
        this.setState({
          menu: menu,
        });
      } else {
        Alert.alert('Session is expired');
        signOut();
      }
    });
  }

  componentDidMount() {
    this.onGetMenu();
  }

  render() {
    const {menu} = this.state;
    const {darkTheme} = this.context;

    return (
      <ScreenContainer theme={darkTheme}>
        {menu ? this.renderMenu() : null}
      </ScreenContainer>
    );
  }
}

const styles = StyleSheet.create({
  accordionContainer: {
    width: '100%',
    height: '100%',
    paddingTop: 20,
  },
  accordion: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
  },
  row: {
    width: '80%',
    padding: 10,
    margin: 5,
    backgroundColor: '#cc4523',
  },
  parentHr: {
    height: 1,
    width: '100%',
  },
  child: {
    width: '100%',
    color: '#cc4523',
  },
  childContainer: {
    width: '100%',
  },
});
