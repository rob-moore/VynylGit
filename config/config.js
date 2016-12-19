var convict = require('convict');

var config = convict({
  env: {
    format: ['prodcution', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  ip: {
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS'
  },
  port: {
    format: 'port',
    default: 3000,
    env: 'PORT'
  }
});

var env = config.get('env');
config.loadfile(`./config/${env}.json`);

config.validate({ strict: true });

module.exports = config;