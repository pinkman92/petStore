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

  // use stronger-than-normal security for signing our JWTs
  JWT_SIGNING_ALGORITHM: "HS512",

  // the 256-byte JWT signing key that we'll use to sign all user tokens.  this
  // should never be checked into version control, but should be the same among
  // all servers.  you can generate this using the secure-random library:
  //
  // const secureRandom = require("secure-random");
  // console.log(secureRandom(512, { type: "Buffer" }).toString("base64"));
  JWT_SIGNING_KEY: "Abhimanyu"
};