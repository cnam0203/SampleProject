import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {AppContext} from '../context/AppContext';
import {ScreenContainer} from './ScreenContainer';
// import {domain} from '../config';
import {SVGGraph} from './SVGGraph';

export default class ActivityScreen extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      graphs: [
        {
          title: 'Columbia',
          differ: null,
          data: null,
          chart: [1, 10, 2, 3, 20, 13, 5, 8, 19],
          line: [4, 5, 6],
        },
        {
          title: 'Vietnam',
          differ: null,
          data: null,
          chart: [10, 2, 4, 1, 7, 11, 15, 8, 9],
          line: [4, 5, 6],
        },
        {
          title: 'Thailand',
          differ: null,
          data: null,
          chart: [10, 2, 4, 1, 7, 11, 15, 8, 9],
          line: [4, 5, 6],
        },
        {
          title: 'Philippines',
          differ: null,
          data: null,
          chart: [10, 2, 4, 1, 7, 11, 15, 8, 9],
          line: [4, 5, 6],
        },
      ],
    };
    this.getRandomNumber = this.getRandomNumber.bind(this);
  }

  getRandomNumber() {
    const newGraphs = this.state.graphs.map((graph, index) => {
      const randomData = Math.floor(Math.random() * 10000) + 1000;
      const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      const randomDiffer = plusOrMinus * Math.floor(Math.random() * 20);
      let newArray = graph.chart;
      let newLine = graph.line;

      newArray.shift();
      newArray.push(randomDiffer);

      newLine.shift();
      newLine.push(randomDiffer);

      return {
        title: graph.title,
        data: randomData,
        differ: randomDiffer,
        chart: newArray,
        line: newLine,
      };
    });

    this.setState({graphs: newGraphs});

    // const {api} = this.props.route.params;
    // const {signOut, getUserToken} = this.context;

    // let url = domain + api;
    // let token = getUserToken();
    // let options = {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   keepalive: true,
    // };

    // fetch(url, options)
    //   .then(res => res.json())
    //   .then(res => {
    //     if (res.status) {
    //       this.setState({data: res.data, isExpired: false});
    //     } else {
    //       this.setState({isExpired: true});
    //       alert('Session is expired');
    //       signOut();
    //     }
    //   });
  }

  componentDidMount() {
    if (!this.state.isExpired) {
      this.getRandomNumber();
    }

    this.interval = setInterval(() => {
      if (!this.state.isExpired) {
        this.getRandomNumber();
      }
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {navigation} = this.props;
    const {darkTheme} = this.context;

    return (
      <ScreenContainer theme={darkTheme}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsHorizontalScrollIndicator={false}>
          {this.state.graphs.map((graph, index) => (
            <SVGGraph
              graph={graph}
              color={'#fa971e'}
              key={index}
              navigation={navigation}
              onPress={true}
            />
          ))}
        </ScrollView>
      </ScreenContainer>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
