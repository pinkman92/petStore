module.exports = {
  // the 'strength' of our bcrypt hashing algorithm
  BCRYPT_WORK_FACTOR: 14,

  // the mongodb error code which means you are attempting to create a duplicate
  // object
  DUPLICATE_KEY_ERROR: 11000,

  // sessions will last for 1 full day
  SESSION_DURATION: 1000 * 60 * 60 * 24,

  // sessions will be extended by 10 minutes if the user is active
  SESSION_EXTENSION_DURATION: 1000 * 60 * 10,

  // our unique secret key -- this keeps sessions secure
  SESSION_SECRET_KEY: "Abhimanyu",

  // only set cookies over https.
  SESSION_SECURE_COOKIES: false,

  // destroy sessions when the browser is closed.
  SESSION_EPHEMERAL_COOKIES: false,
  JWT_SIGNING_ALGORITHM: "HS512",
  JWT_SIGNING_KEY: "Abhimanyu"
};