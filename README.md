# Amplify React GraphQL
Build a Full-Stack React Application using AWS Amplify

## Requirements
- AWS Account
- AWS CLI
- Amplify CLI

## Config profile
```
amplify configure
```
Select region, create user and config AWS profile

## Create Amplify app
Create new app
```
amplify init
```

Go to Amplify app -> Frontend environments

- Select GitHub
- Allow Authorizer
- Select repository, branch
- Name for app `amplifyreactgraphql`
- Uncheck **Deploy updates to backend resources with your frontend on every code com** at Backend deployments
- Review and Save and Deploy

## Setting app backend
Backend environmens -> Get started

## Connect your app to this backend environment using the Amplify CLI
```
amplify pull --appId app_id --envName staging
```

## Create a GrapQL API and database

Add a GraphQL API

```
amplify add api
```

## App build specification
Go to Amplify console -> App settings -> Build settings -> App build specification -> Edit
```
version: 1
backend:
  phases:
    build:
      commands:
        - '# Execute Amplify CLI with the helper script'
        - amplifyPush --simple
frontend:
  phases:
    preBuild:
      commands:
        - yarn install
    build:
      commands:
        - yarn run build
  artifacts:
    baseDirectory: build
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

## Deploy 
```
amplify push --y
```

## Clean up
Remove auth

```
amplify remove auth
```

Then run the Amplify push command:

```
amplify push
```

Deleting the entire project

```
amplify delete
```

Don't forget delete Amplify app on console

## Issues
### File project: data should NOT have additional properties: 'graphqltransformer'
Go to Amplify console -> App settings -> Build settings. Scroll down to "Build Image Settings" section and click Edit

Change Amplify CLI to latest or specific version.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

