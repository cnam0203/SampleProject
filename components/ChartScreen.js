import React from 'react';
import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import {AppContext} from '../context/AppContext';
import {ScreenContainer} from './ScreenContainer';
import HighchartsReactNative from '@highcharts/highcharts-react-native';
import DeviceInfo from 'react-native-device-info';

const model = DeviceInfo.getModel();

function getBottomPadding() {
  let paddingBottom = 150;

  if (model === 'iPhone 12') {
    paddingBottom = 100;
  }

  return paddingBottom;
}

export default class ChartScreen extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      charts: null,
    };
    this.getCharts = this.getCharts.bind(this);
    this.renderCharts = this.renderCharts.bind(this);
  }

  renderCharts() {
    const {charts} = this.state;

    return (
      <View style={styles.charts}>
        {charts.map((chart, index) => (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            key={index}
            style={styles.highchartContainer}>
            <HighchartsReactNative styles={styles.chart} options={chart} />
          </ScrollView>
        ))}
      </View>
    );
  }

  getCharts() {
    const {api} = this.props.route.params;
    const {signOut, fetchRequest} = this.context;

    let url = '/get-chart' + api;

    fetchRequest(url).then(res => {
      if (res.status) {
        this.setState({charts: res.data.charts});
      } else {
        Alert.alert('Session is expired');
        signOut();
      }
    });
  }

  componentDidMount() {
    this.getCharts();
  }

  render() {
    const {charts} = this.state;
    const {darkTheme} = this.context;

    return (
      <ScreenContainer theme={darkTheme}>
        {charts ? this.renderCharts() : null}
      </ScreenContainer>
    );
  }
}

const styles = StyleSheet.create({
  chart: {
    height: 400,
    width: 400,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingBottom: getBottomPadding(),
  },
  charts: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  highchartContainer: {
    borderRadius: 25,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
});
