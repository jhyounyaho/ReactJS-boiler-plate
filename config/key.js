// 환경변수 process.env.NODE_ENV
if (process.env.NODE_ENV === 'production') {
  // Deploy(배포) 한 후 
  module.exports = require('./prod');
} else {
  // Local 환경에서 
  module.exports = require('./dev');
}