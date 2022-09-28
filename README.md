# An CRUD phone application with React, MongoDB, NodeJS, Express

- View Live on Heroku [https://secure-ocean-53157.herokuapp.com/](https://secure-ocean-53157.herokuapp.com/)
- View Live on Fly.io: [https://hidden-voice-3867.fly.dev/](https://hidden-voice-3867.fly.dev/)

## Description

A simple app where users can:

- Add new phone number
- Edit contact
- Delete number from list

## Technologies used:

- React
- MongoDB Atlas
- Nodejs
- Express
- Material UI

### What I learned:

ESlint is the current leading tool for static analysis aka "linting"
install ESlint as a dev dependency to backend project with command:

```shell
npm install eslint --save-dev
```

After this, initialize a default ESlint config with command:

```shell
npx eslint --init
```

after that, the config will be saved in the .eslintrc.js file

inspecting and validating a file like index.js can be done with command

```shell
npx eslint index.js
```

create a separate script for linting

```package.js
"lint": "eslint ."
```

```shell
npx run lint
```

## Deployment with Fly.io

Since heroku free version will be over soon, I haved also deployed the backend to fly.io

The following steps are taken to deploy app to Fly.io

- install fly

```shell
brew install flyctl
```

- Create a Fly.io account

```shell
flyctl auth signup
```

- Start by authenticating

```shell
fly auth login
```

- Initialize app by running the command in root directory of the app

```shell
fly launch
```

Give app a name or let Fly.io auto generate one, pick region, Do NOT create a postgress Database for the app
answer YES to "Would you like to deploy now?"
If all goes well, app should be up and running.

- Open app

```shell
fly open
```

- New deployment of app when its updated

```shell
fly deploy
```

## Useful Links

[https://fullstackopen.com/en/part3/deploying_app_to_internet](https://fullstackopen.com/en/part3/deploying_app_to_internet)
