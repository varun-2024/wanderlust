class ExpressError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

module.exports = ExpressError;
// This code defines a custom error class called ExpressError that extends the built-in Error class in JavaScript. The constructor takes two parameters: status and message. It calls the parent constructor with the message and sets the status property to the provided status code. This class can be used
// in Express applications to handle errors more effectively by providing a consistent way to represent and respond to errors with a status code and message. The module exports the ExpressError class for use in other parts of the application.
// The code also includes a commented-out section that shows how to use this error class in an Express application, including a test route that generates an error and an error handling middleware that logs the error and sends a response to the client.
