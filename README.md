# NextGen Real Estate API
This is an express + typescript server for allowing access to our stored MLS listings from Listhub. 

### Features
- [✔] Typescript
- [✔] Express
- [✔] Swagger documentation
- [✔] Jest
- [✔] Supertest (integration testing)
- [✔] Pm2 (handling multiple processes in production)
- [✔] Custom error handling middleware
- [ ] ElasticSearch connection (soon)
- [ ] Token authentication (soon)
- [ ] Redis (soon)
- [ ] Winston logging (soon)

### Folder Structure

```
├── coverage
├── src
│   ├── config
│   │   └── swagger.json
│   ├── middleware
|	|	└──middlewares.ts
│   ├── services
|	|	├── service
|	|	|	├── tests
|	|	|	├── ServiceController.ts
|	|	|	├── ServiceService.ts
|	|	|	└── routes.ts
|	|	└── index.ts
│   ├── utils
|	|	└── index.ts
│   └── app.ts
├── dist
├── .gitignore
├── node_modules
├── .env.example
├── README.md
├── package-lock.json
├── package.json
├── pm2.yaml
├── tsconfig.json
└── tslint.json
```

### To run in development
1. Clone the repo
2. Create and populate .env file at root
3. ``npm install``
4. ``npm run dev``

### To run in production
1. Change ``NODE_ENV`` to ``production``
2. ``npm start``

### To run tests
``npm run test``

### To view swagger documentation
1. Run in development
2. navigate to localhost:{port}/api/v1/api-docs

### To view code coverage
1. Run tests
2. Navigate to project root `/coverage/lcov-report` and open `index.html` in your browser of choice

## Development
### Building a new endpoint on existing service
1. Document the new endpoint in the swagger.json file
2. Add new route to the routes.ts file in the existing service
3. Create a controller function in the `{Service}Controller.ts` file that will be called by the route
4. Create a service function in the `{Service}Service.ts` file that will perform the data access
5. Write tests in each of the files in the tests folder for the service. Be sure to test each piece of the new endpoint thoroughly (route, controller, service function) and be aware of edge cases (typescript helps eliminate a number of these)
6. Run your tests and make sure that the endpoints are functioning as expected
7. Open `localhost:{port}/api/v1/api-docs` route and ensure that new endpoints are documented correctly and test them here

### Building a new service
1. Create a new folder under services
2. Document the endpoints of the new service in the swagger.json file
3. Create a routes.ts, `{NewService}Controller.ts`, and `{NewService}Service.ts` file
4. Build the routes, controllers, and service functions within these files
5. Be sure to import these new routes in the `/services/index.ts` file
6. Create a tests folder and write tests to cover the new endpoints (as above in Building a new endpoint section)
7. Run your tests and make sure that the endpoints are functioning as expected
8. Open `localhost:{port}/api/v1/api-docs` route and ensure that new endpoints are documented correctly and test them here

### Building a new middleware for the server itself
1. Create new `{middleware}.ts` under the middleware folder and build your middleware here
2. Import the new middleware in the `/middleware/index.ts` file and add it do the default export array

### Building a new middleware to be used by routes 
1. Create new `{middleware}.ts` under the middleware folder and build your middleware here
2. Import into the `routes.ts` file that will use the new middleware function. 
3. Add the middleware function to the handler array for the given route

## Error Handling
Errors are handled automatically by the server. We also have defined client error types that we can call. The list of 400 error types are listed at /src/utils/httpErrors.ts. The status codes are hardcoded and default messages are set although the error message can be overridden when error thrown. 
eg. a 403 error will default to saying `'Forbidden'` however you can also : 
`throw new HTTP403Error('You don't have access to this resource')` will return to the client
`{statusCode: 403, message: 'You don't have access to this resource'}`