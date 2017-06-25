#### React with electron and firebase backend samples

- Template for a react electron app with a firebase backend


***

#### Firebase configuration

  1. Copy and paste firebase db config into `./index.js`

  2. Make sure to set firebase read/write rules to `true` in your firebase dashboard.
  ```json
    {
      "rules": {
        ".read": true,
        ".write": true
      }
    }
  ```

***

#### Setup

1. Clone the repo
```sh
$ git clone https://github.com/dankreiger/react-electron-firebase.git
```

2. Run yarn (install dependencies)
```sh
$ yarn
```

3. Start dev environment on port 3000 and electron container
```sh
$ yarn dev
```
