/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {AreaChart, LineChart} from 'react-native-svg-charts';
// import {AreaChart, Grid} from 'react-native-svg-charts';
// import * as shape from 'd3';

export const SVGGraph = ({graph, color, navigation}) => {
  const today = new Date();
    return (
            <LineChart
                style={[styles.svgGraph, {backgroundColor: color}]}
                data={graph.charts}
                svg={{ fill: '#9da3a3', stroke: '#18424a' }}
                contentInset={{ top: 20 }}
             >
               <View style={styles.textContainer}>
                 <View style={styles.top}>
                  <Text style={styles.report}>{graph.title}</Text>
                  <Text style={styles.differ}>{`${graph.differ}%`}</Text>
                 </View>
                <Text style={styles.center}>{graph.data}</Text>
                <Text style={styles.bottom}>{`Last ${today.getHours()}:${today.getMinutes()}`}</Text>
               </View>
            </LineChart>
        );
  };

const styles = StyleSheet.create({
  svgGraph: {
      height: 200,
      width: 300,
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
  },
  differ: {
    width: '50%',
    textAlign: 'right',
    color: '#23e609',
    fontWeight: '900',
    fontSize: 20,
  },
  bottom: {
    width: '100%',
    textAlign: 'right',
    color: '#fff',
  },
  center: {
    width: '100%',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
});
