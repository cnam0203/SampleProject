import {Platform} from 'react-native';
import AzureAuth from 'react-native-azure-auth';

const client_id = 'dc9064e8-7d1f-45f4-a287-c93d1246e1fc';
const tenant_id = 'dc466264-fa56-4db3-b341-ae3ade5b950d';
const redirect_url =
  Platform.OS === 'ios'
    ? 'com.sampleproject://com.sampleproject/ios/callback'
    : 'com.sampleproject://com.sampleproject/android/callback';

export const createNewAzureAuth = () => {
  return new AzureAuth({
    clientId: client_id,
    tenant: tenant_id,
    redirectUri: redirect_url,
  });
};

export const domain = 'http://192.168.1.84:8000/api';
