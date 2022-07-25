## INSTALL EXPO 
```bash
# for ubuntu
$ npm install -g expo-cli

# verify
$ expo --version
```

## CREATE APP
In this example, this project is using "typescript" and minimal bare workflow
```bash
# create app command
$ expo init NAME_APP
# select "minimal" in "Bare workflow"
# change "App.js" to "App.tsx" if your project is typescript
# create a file in the project root called "tsconfig.json"

# start your project for the first time
$ expo start
# Upon noticing the above changes, the expo will understand, 
# that your project will use typescript, type Y for yes and, 
# download the necessary packages.

# OPTIONAL
# after start your project
# press "shift + d" to activate developer tools
# press "d" to open in your browser
```

## REACT NAVIGATION
For more info, docs: https://reactnavigation.org/docs/getting-started

```bash
# Install core 
$ npm install @react-navigation/native

# Install dependencies
$ expo install react-native-screens react-native-safe-area-context

# Install native-stack navigator library
$ npm install @react-navigation/native-stack
```

## INSTALL/CONFIGURE FIREBASE IN THE PROJECT
For more info, docs:

```bash
# Install core
$ npm install --save @react-native-firebase/app
```

**configure firebase plugin for expo**
follow this doc: https://docs.expo.dev/guides/setup-native-firebase/

In the Firebase console, add the app for iOS and Android, generate *GoogleService-Info.plist* for iOS and *google-services.json* for Android, copy both files into the project root directory.

change your app.json file in the project root directory like the example below:
```json
{
  "expo": {
    "name": "apphelp",
    "slug": "apphelp",
    "version": "1.0.0",
    "assetBundlePatterns": [
      "**/*"
    ],
    "plugins": [
      "@react-native-firebase/app"
    ],
    "android": {
      "package": "com.apphelp",
      "googleServicesFile": "./google-services.json"
    },
    "ios": {
      "bundleIdentifier": "com.apphelp",
      "googleServicesFile": "./GoogleService-Info.plist"
    }
  }
}
```

now run in the terminal this command: `expo prebuild` and answer the questions

> What would you like your Android package name to be?
ex: com.apphelp

> What would you like your iOS bundle identifier to be?
ex: com.apphelp

#### Install firestore module
```bash
# install module
$ npm i @react-native-firebase/firestore

# If you're developing your app using iOS, run this command
$ cd ios/ && pod install
```

#### Install firestore module
```bash
# install module
$ npm i @react-native-firebase/auth

# If you're developing your app using iOS, run this command
$ cd ios/ && pod install
```

## BUILD AND RUN IN ANDROID NATIVE EMULATOR
Tutorial: https://react-native.rocketseat.dev/

If this possible error occurs as in the example below:
> SDK location not found. Define location with an ANDROID_SDK_ROOT environment variable or by setting the sdk.dir path in your project's local properties file at...

To fix it, just create a file called **"local.properties"** inside the **android** folder in your project, and inside this file put the content as in the example below:

**/android/local.properties**
```bash
# For Linux (Ubuntu) users:
sdk.dir=/home/USERNAME/Android/Sdk

#For Mac users, Where USERNAME is your OSX username.
sdk.dir = /Users/USERNAME/Library/Android/sdk
```
REF: https://stackoverflow.com/questions/27620262/sdk-location-not-found-define-location-with-sdk-dir-in-the-local-properties-fil