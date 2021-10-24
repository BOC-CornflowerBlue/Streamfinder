const app = require('./app.js');
const config = require('./config/config');

app.listen(config.port, () => {
  console.log(`NSA is listening in on ${config.name} at ${config.baseUrl}:${config.port}`);
})

module.exports = app;