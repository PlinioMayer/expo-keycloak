# About
This library is based on [JavaScriptJohn/expo-keycloak](https://github.com/JavaScriptJohn/expo-keycloak) written in
Typescript. It fixes some token refresh bugs and implements offline access.

# Keycloak for Expo

> Keycloak authentication for react-native apps using Expo.

This package enables you to login against a keycloak instance from your Expo app without the need to eject!

This package also automatically handles refreshing of the token. (You can disable this behavior in `KeycloakProvider` props)

## (known) Supported Keycloak versions:
- 16.1.1

## Install

#### 1. Expo & React peer deps

Expo and React should already be in your project, but just in case, let's make it clear you need those. Better yet, Expo should be in version 40 or above.

#### 2. Expo modules

To ensure maximum compatibility, we will install these separately:

```
expo install expo-random expo-auth-session
```

#### 3. Other peer deps and the star of the evening `expo-keycloak` itself

```
yarn add @react-native-async-storage/async-storage expo-auth-session-keycloak
```

## Usage

```typescript jsx
// App.tsx
import {
  KeycloakConfiguration,
  KeycloakProvider,
} from 'expo-auth-session-keycloak';
import AppConfig from './app.json'; // This is Expo's app json where your scheme should be defined

export default () => {
  const keycloakConfiguration: KeycloakConfiguration = {
    clientId: 'AGENT_007',
    realm: 'REALM_OF_HER_MAJESTY',
    url: 'http://WHERE_THE_KC_RESIDES', // This is usually an url ending with /auth
    scheme: AppConfig.expo.scheme,
  };

  return (
    <KeycloakProvider {...keycloakConfiguration}>
      <Auth />
    </KeycloakProvider>
  );
};
```

```typescript jsx
// Auth.tsx
import { useKeycloak } from 'expo-auth-session-keycloak'
import { ActivityIndicator, Button, Text } from 'react-native';

export const Auth = () => {
  const {
    ready, // If the discovery is already fetched
    login, // The login function - opens the browser
    isLoggedIn, // Helper boolean to use e.g. in your components down the tree
    token, // Access token, if available
    logout, // Logs the user out
  } = useKeycloak();
  if (!ready) return <ActivityIndicator />;

  if (!isLoggedIn)
    return (
      <View style={{ margin: 24 }}>
        <Button onPress={login} title={'Login'} />
      </View>
    );

  return (
    <View style={{ margin: 24 }}>
      <Text style={{ fontSize: 17, marginBottom: 24 }}>Logged in!</Text>
      <Text>Token: {token.slice(0, 24)}...</Text>
      <Button onPress={logout} title={'Logout'} style={{ marginTop: 24 }} />
    </View>
  );
};
```

## Publish package

```
yarn build
npm publish
```

***

# Contribute
Until now, except for the work already done in the repos this one was forked from, this has been a solo dev project.
There's no "guide" for contributing and all help is welcome. Feel free to make a pull request, open as many issues as
you need (I'll do my best to answer) and even contact me at [pctmayer@gmail.com](mailto:pctmayer@gmail.com)