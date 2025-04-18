# Elite Educators Backend

Welcome to the backend repository of the Elite Educators Platform. This backend system is designed to support the seamless functioning of the Elite Educators online education hub.

- live site: https://elite-educators-frontend.vercel.app
- client site: https://github.com/ThisIsKhalid/elite-educators-frontend

## Features

- **User Authentication:**
  - Secure user authentication system to ensure data privacy.

- **API Endpoints:**
  - Well-defined API endpoints for managing courses, users, and other platform functionalities.

- **Data Management:**
  - Database interactions for efficient course and user data management.

- **Security:**
  - Implementation of security measures to protect user and system data.


## Technologies

- **Backend Framework:**
  - [Express](https://expressjs.com/): A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- **Database:**
  - [Mongoose](https://mongoosejs.com/): A MongoDB object modeling tool designed to work in an asynchronous environment.

- **Authentication:**
  - [JSON Web Token (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken): A library to generate and verify JSON Web Tokens, which are used for user authentication.

- **Security:**
  - [bcrypt](https://www.npmjs.com/package/bcrypt): A library for hashing passwords to enhance security.

- **Middleware:**
  - [cors](https://www.npmjs.com/package/cors): A package for enabling Cross-Origin Resource Sharing (CORS) in Express.

- **Environment Variables:**
  - [dotenv](https://www.npmjs.com/package/dotenv): A zero-dependency module that loads environment variables from a `.env` file into `process.env`.

- **HTTP Status Codes:**
  - [http-status](https://www.npmjs.com/package/http-status): A collection of HTTP status codes for convenient use in Express applications.

- **SSLCommerz Integration:**
  - [sslcommerz-lts](https://www.npmjs.com/package/sslcommerz-lts): A library for integrating SSLCommerz, a secure and efficient payment gateway.

- **TypeScript:**
  - [typescript](https://www.typescriptlang.org/): A superset of JavaScript that adds static types, enabling a better development experience.

- **Linting and Formatting:**
  - [eslint](https://eslint.org/): A pluggable and configurable linter tool for identifying and fixing problems in JavaScript and TypeScript code.
  - [prettier](https://prettier.io/): An opinionated code formatter that ensures consistent code style.

- **Development Tools:**
  - [ts-node-dev](https://www.npmjs.com/package/ts-node-dev): A development tool for running TypeScript scripts with automatic restarts.
  - [husky](https://www.npmjs.com/package/husky): A tool to enable Git hooks.
  - [lint-staged](https://www.npmjs.com/package/lint-staged): A tool to run linters on pre-committed files in Git.

- **Type Definitions:**
  - [DefinitelyTyped](https://definitelytyped.org/): TypeScript type definitions for various packages.

## Getting Started

To get started with the Elite Educators Backend, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ThisIsKhalid/elite-educators-backend.git
   ```

2. **Install Dependencies:**
   ```bash
   cd elite-educators-backend
   yarn install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file and set up the required environment variables.

   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=
   BCRYPT_SALT_ROUNDS=12
   JWT_SECRET=
   JWT_EXPIRES_IN=
   JWT_REFRESH_SECRET=
   JWT_REFRESH_EXPIRES_IN=

   STORE_ID=
   STORE_PASSWORD=
   IS_LIVE=
   ```

4. **Run the Application:**
   ```bash
   yarn dev
   ```

   The backend will be running at `http://localhost:5000` by default.

