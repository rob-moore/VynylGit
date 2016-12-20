const convict = require('convict');
const path = require('path');

const config = convict({
  env: {
    format: ['prodcution', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  ip: {
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
  },
  port: {
    format: 'port',
    default: 3000,
    env: 'PORT',
  },
});

const localConfig = path.join(path.resolve(__dirname), 'local.json5');

config.loadFile(localConfig);

config.validate({ strict: true });

module.exports = config;
