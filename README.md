# Crypto check application.

Welcome, this the documentation of my cryptocurrency application.

## Table of contents

1. [Getting Started](#getting-started)
2. [Dependencies](#dependencies)
3. [Styling](#styling)
4. [Routing](#routing)
5. [State Management](#state-management)
6. [API Integration](#api-integration)
7. [Testing](#testing)

## Getting Started

1. Clone the repository: https://github.com/JuozasPetryla/crypto-site.git
2. Navigate to the crypto-app/client directory and run `npm install`
3. Navigate to the crypto-app/server directory and run `npm install`
4. In the crypto-app/client directory run `npm start`
5. In the crypto-app/server directory run `npm run dev`
6. The app should run on: `http://localhost:3000`

## Dependencies

This project uses the following dependencies:

Client side:

- Axios
- Bootstrap
- Chart.js
- Chartjs-adapter-moment
- React
- React-chartjs-2
- React-redux
- React-router
- React-router-dom
- Redux
- Sass

Server side:

- Ccxt
- Cors
- Express
- Nodemon

## Styling

For styling I used Bootstrap CSS framework, and for custom styles I used Sass modules for React components. Global variables and mixins are declared in the `_variables.scss` and `_mixins.sccs` files respectively.

## Routing

Routing is handled by React router.

## State Management

State is managed by Redux. All of the state related files can be found in the /client/src/app directory.

## API Integration

We communicate with out backend API using the Axios library. All of the API calls are done inside the Redux `CryptoSlice.js` file. Further information about the API in the [API README.md file](server/README.md).
