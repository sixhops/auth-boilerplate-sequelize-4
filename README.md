# Authentication Boilerplate

Node/Express Full-Stack Boilerplate with local authentication.

## Relevant Tech Used

* Node / Express
* express-session
* Passport (Local Strategy)
* bCrypt
* Postgres (pg@6.4.2)
* Sequelize 4

## Getting Started

* Run `npm install` to install dependencies
  * Use `npm run lint:js` to lint your JS
  * Use `npm run lint:css` to lint your CSS
  * Use `npm test` to run tests
* Setup the databases
  * Change the database names in `config/config.json` to reflect your project
  * Run `createdb project_name_development` to create the development database
  * Run `createdb project_name_test` to create the test database
