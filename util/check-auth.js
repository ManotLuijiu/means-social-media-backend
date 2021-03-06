const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
// const { SECRET_KEY } = require('../config');

module.exports = (context) => {
  // context = { ... headers}
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ...
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token', err);
      }
    }
    throw new Error(
      `Authentication token must be valid or Bearer [token] format`
    );
  }
  throw new Error(`Authorization header must be provided`);
};
