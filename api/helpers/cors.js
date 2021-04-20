const cors = require('cors');

const WHITELIST = [
  'http://localhost:3001',
  'chrome-extension://aejoelaoggembcahagimdiliamlcdmfm'
];

const corsOptions = {
  origin(origin, callback) {
    if (WHITELIST.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS for origin ${origin}`));
    }
  },
};

function corsMiddleware(app) {
  //allow OPTIONS on all resources
  app.options('*', cors())

  return app.use(cors(corsOptions));
}

module.exports = {
  corsMiddleware,
};
