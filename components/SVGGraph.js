/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import {AreaChart} from 'react-native-svg-charts';
import {CountUp} from 'use-count-up';
// import {AreaChart, Grid} from 'react-native-svg-charts';
// import * as shape from 'd3';

const Counter = ({ end }) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.start = end;
  });

  return (
    <CountUp isCounting end={end} start={ref.start} autoResetKey={end} duration={3} shouldUseToLocaleString={true}/>
  );
};

const CounterMemo = React.memo(Counter);

export const SVGGraph = ({graph, color, navigation, onPress}) => {
  const today = new Date();
  const data2 = [1, 10, 2, 3, 20, 13, 5, 8, 1];

  return (
    <TouchableHighlight style={styles.graphContainer}
                        onPress={() => { onPress ? navigation.push('DetailDbScreen', {title: graph.title}) : null;}}>
      <View style={styles.container}>
        <AreaChart
          style={[styles.svgGraph, {backgroundColor: color}]}
          data={graph.chart}
          svg={{ fill: 'rgba(11, 127, 190, 0.2)', stroke: '#18424a' }}
          contentInset={{ top: 30 }}
        >
          <View style={styles.textContainer}>
            <View style={styles.top}>
              <Text style={styles.report}>{graph.title}</Text>
              <Text style={[styles.differ, {color: graph.differ >= 0 ? '#23e609' : '#ed4321'}]}>{`${graph.differ}%`}</Text>
            </View>
            <Text style={styles.animateNum}>
              <CounterMemo start={0} end={graph.data} />
            </Text>
            <Text style={styles.bottom}>{`Last ${today.getHours()}:${today.getMinutes()}`}</Text>
          </View>
        </AreaChart>
        <AreaChart
            style={ StyleSheet.absoluteFill }
            data={ data2 }
            svg={{ fill: 'none', stroke: '#fff', strokeDasharray: '4 4', strokeWidth: '2'}}
            contentInset={ { top: 30 } }
        />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  graphContainer: {
    height: 150,
    width: 350,
    marginVertical: 5,
  },
  container: {
    width: '100%',
    height: '100%',
  },
  svgGraph: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  textContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  top: {
    width: '100%',
    flexDirection: 'row',
    height: 30,
  },
  report: {
    width: '50%',
    color: '#87847c',
    fontSize: 25,
    fontWeight: 'bold',
  },
  differ: {
    width: '50%',
    textAlign: 'right',
    fontWeight: '900',
    fontSize: 20,
  },
  bottom: {
    width: '100%',
    textAlign: 'right',
    color: '#fff',
  },
  animateNum: {
    width: '100%',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 40,
    textAlign: 'center',
  },
});
