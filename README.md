# An phone application with NodeJS, Express

[View Live](https://secure-ocean-53157.herokuapp.com/)

## Description

Users can:

- Add new phone number
- Delete number from list

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
