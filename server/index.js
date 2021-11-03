const express = require('express');
const app = express();

require('dotenv').config();
const {db} = require('./database/database');
const clientBundleScript = '<script src="http://localhost:8080/scripts/bundle.js"></script>';
const clientBundleStyle = '<link rel="stylesheet" href="http://localhost:8080/styles/bundle.css">';

// parse application/json
app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

app.post('/login', (req, res) => {
  console.log(req.body);
  res.end('success');
});

app.get('*', (req, res) => {
  // const jsx = ReactDOMServer.renderToString(<Streamfinder/>);
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Streamfinder</title>
        ${clientBundleStyle}
        <link rel="icon" href="data:,">
      </head>
      <body>
        <div id="Streamfinder"></div>
        ${clientBundleScript}
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log(`Server listening on port ${3000}`);
});
