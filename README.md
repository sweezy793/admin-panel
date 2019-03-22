# admin-panel

An admin panel app which has login and sign up functionality and stores user information in database. On successful login, redirects to dashboard.

## Getting Started

### Prerequisites

Your machine should have npm(or yarn), NodeJS and MongoDB server installed to use this locally

### Installation

```js
git clone https://github.com/sweezy793/admin-panel.git
```

- Install server dependencies(in root directory)

```js
npm install
```

- Install client dependencies

```js
cd client
npm install
```

- You can either use your own local mongoDB database or any cloud database just change mongoURI and secretOrKey in config/keys.js file

```js
module.exports = {
  mongoURI: "mongodb://localhost:27017/admin_panel",
  secretOrKey: "admin"
};
```

- This app uses concurrently so you don't need to run 2 different instances for client and server, use this command in root directory to run the app.

```js
npm run dev
```

### Testing

This app uses jest and enzyme for unit snapshot testing. Testing has been done in 2 different ways, one for dumb components and other for functional components. Just run this command in client directory.

```js
npm run test
```

Jest will run tests with the existing snapshots to check if the components render and work on your machine as they did during development. You can also delete the existing snapshots and run tests against your own snapshots.

---
