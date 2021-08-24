import React from 'react';
import {domain, createNewAzureAuth} from '../config';
import {Alert} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {FINGER_PRINT, USER_INFO, USER_TOKEN, EXPIRY} from '../constant';
import TouchID from 'react-native-touch-id';
import {getUniqueId} from 'react-native-device-info';

export const AppContext = React.createContext();

const AppContextProvider = ({children}) => {
  const [userToken, setUserToken] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});
  const [darkTheme, setDarkTheme] = React.useState(false);
  const [isFingerPrint, setFingerPrint] = React.useState(false);

  const loadStorageUserInfo = async () => {
    const loadedUserToken = await AsyncStorage.getItem(USER_TOKEN);
    const loadedUserInfo = await AsyncStorage.getItem(USER_INFO);

    setUserToken(loadedUserToken);
    setUserInfo(JSON.parse(loadedUserInfo));
  };

  const loadStorageExpiredTouchId = async () => {
    const expiredTouchId = await AsyncStorage.getItem(FINGER_PRINT);
    return expiredTouchId;
  };

  const saveStorage = async (isVerifyTouchId, saveUserToken, saveUserInfo) => {
    let expiredDate = null;

    if (isVerifyTouchId) {
      const today = new Date();
      expiredDate = new Date();
      expiredDate.setDate(today.getDate() + EXPIRY);
    }

    await AsyncStorage.setItem(FINGER_PRINT, expiredDate.toString());
    await AsyncStorage.setItem(USER_TOKEN, saveUserToken);
    await AsyncStorage.setItem(USER_INFO, JSON.stringify(saveUserInfo));
  };

  const clearAsyncStorage = async () => {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  };

  const request = async (url = '', body, method = 'GET', headers = {}) => {
    if (body != null) {
      headers['Content-Type'] = 'application/json';
    }

    if (userToken) {
      console.log(userToken);
      headers.Authorization = `Bearer ${userToken}`;
    }

    const options = {
      method: method,
      headers: headers,
      body: body != null ? JSON.stringify(body) : null,
    };

    return await fetch(domain + url, options)
      .then(res => res.json())
      .catch(error => Alert.alert(error));
  };

  const appContextData = {
    userToken: userToken,
    userInfo: userInfo,
    darkTheme: darkTheme,
    isFingerPrint: isFingerPrint,
    changeDarkTheme: function () {
      setDarkTheme(previousState => !previousState);
    },
    changeFingerPrint: function () {
      if (isFingerPrint) {
        clearAsyncStorage().then(() => setFingerPrint(false));
      } else {
        saveStorage(true, userToken, userInfo).then(() => setFingerPrint(true));
      }
    },
    authenTouchId: async function () {
      loadStorageExpiredTouchId().then(expiredTouchId => {
        if (expiredTouchId != null) {
          const curDate = new Date();
          const expiredDate = new Date(expiredTouchId);

          if (curDate.getTime() < expiredDate.getTime()) {
            TouchID.isSupported().then(biometryType => {
              // Success code
              if (biometryType === 'FaceID') {
                Alert.alert('FaceID is supported.');
              } else {
                TouchID.authenticate('use fingerprint to verify')
                  .then(success => {
                    Alert.alert('Successfully');
                    loadStorageUserInfo().then(() => setFingerPrint(true));
                  })
                  .catch(error => {
                    if (error.name === 'LAErrorAuthenticationFailed') {
                      Alert.alert('Authentication Failed');
                    }
                  });
              }
            });
          }
        } else {
          clearAsyncStorage();
        }
      });
    },
    fetchRequest: function (url, body, method, headers) {
      return request(url, body, method, headers);
    },
    signIn: async function () {
      let azureAuth = createNewAzureAuth();
      let tokens = await azureAuth.webAuth.authorize({
        scope: 'openid profile User.Read',
      });

      const url = '/auth/login';
      const method = 'POST';
      const body = {
        accessToken: tokens.accessToken,
        deviceId: getUniqueId(),
      };

      request(url, body, method).then(res => {
        if (res.status) {
          Alert.alert(
            'Activate TouchID authentication ?',
            'use fingerprint to verify',
            [
              {
                text: 'Yes',
                onPress: () => {
                  saveStorage(true, res.jwtToken, res.userInfo);
                  setFingerPrint(true);
                },
              },
              {
                text: 'No',
                onPress: () => clearAsyncStorage(),
              },
            ],
          );

          setUserToken(res.jwtToken);
          setUserInfo(res.userInfo);
        }
      });
    },
    signOut: async function () {
      let url = '/auth/logout';

      request(url).then(res => {
        if (!res.status) {
          clearAsyncStorage().then(() => {
            setUserToken(false);
            setUserInfo({});
            setFingerPrint(false);
          });
        }
      });
    },
  };

  return (
    <AppContext.Provider value={appContextData}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
