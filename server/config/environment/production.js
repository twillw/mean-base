'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            9000,

  // Application url
  APP_URL: '',

  // MongoDB connection options
  mongo: {
    uri:'mongodb://localhost/meanbase-live',
    //options: {
      //user: 'nascent',
      //pass: 'na$AquaSwim2015!!',
      //auth: {authdb:'admin'}
    //}
  },

};
