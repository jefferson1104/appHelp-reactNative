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

