/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from 'react-native-splash-screen';

import {AppContext} from './context/AppContext';
import AppContextProvider from './context/AppContext';
import {LoginScreen} from './components/LoginScreen';
import {ProfileScreen} from './components/ProfileScreen';
import ActivityScreen from './components/ActivityScreen';
import ChartScreen from './components/ChartScreen';
import InGameScreen from './components/InGameScreen';
import HomeScreen from './components/HomeScreen';
import {MenuScreen} from './components/MenuScreen';
import DetailDbScreen from './components/DetailDbScreen';

var DeviceUUID = require('react-native-device-uuid');
DeviceUUID.getUUID().then(uuid => {
  console.log(uuid);
});

const Tabs = createBottomTabNavigator();
const DashboardStack = createStackNavigator();
const MainReportStack = createStackNavigator();
const InGameStack = createStackNavigator();

const DashboardStackScreen = () => (
  <DashboardStack.Navigator>
    <DashboardStack.Screen name="Dashboard">
      {props => <MenuScreen {...props} menuId="dashboard" />}
    </DashboardStack.Screen>
    <DashboardStack.Screen
      name="Activity"
      component={ActivityScreen}
      options={({route}) => ({title: route.params.title})}
    />
    <DashboardStack.Screen
      name="DetailDbScreen"
      component={DetailDbScreen}
      options={({route}) => ({title: route.params.title})}
    />
  </DashboardStack.Navigator>
);

const MainReportStackScreen = () => (
  <MainReportStack.Navigator>
    <MainReportStack.Screen name="Main Reports">
      {props => <MenuScreen {...props} menuId="mainReports" />}
    </MainReportStack.Screen>
    <MainReportStack.Screen
      name="ReportMenu"
      options={({route}) => ({title: route.params.title})}>
      {props => <MenuScreen {...props} menuId={props.route.params.menuId} />}
    </MainReportStack.Screen>
    <MainReportStack.Screen
      name="ReportChart"
      component={ChartScreen}
      options={({route}) => ({title: route.params.title})}
    />
  </MainReportStack.Navigator>
);

const InGameStackScreen = () => (
  <InGameStack.Navigator>
    <InGameStack.Screen name="InGame" component={InGameScreen} />
    <InGameStack.Screen
      name="Chart"
      component={ChartScreen}
      options={({route}) => ({
        title: route.params.game + ' ' + route.params.report,
      })}
    />
  </InGameStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator
    tabBarOptions={{
      activeTintColor: '#cc4523',
    }}>
    <Tabs.Screen
      name="Dashboard"
      component={DashboardStackScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons
            name="view-dashboard"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="Main Reports"
      component={MainReportStackScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="chart-line" color={color} size={size} />
        ),
      }}
    />
    <Tabs.Screen
      name="InGame"
      component={InGameStackScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="gamepad" color={color} size={size} />
        ),
      }}
    />
    <Tabs.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tabs.Navigator>
);

const Content = () => {
  const {userToken} = React.useContext(AppContext);

  return (
    <NavigationContainer>
      {userToken ? <TabsScreen /> : <LoginScreen />}
    </NavigationContainer>
  );
};

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AppContextProvider>
      <Content />
    </AppContextProvider>
  );
};

export default App;
