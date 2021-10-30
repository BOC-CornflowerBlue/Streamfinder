const express = require('express');
const cookieParser = require('cookie-parser');
const auth = require('./auth/session/sessionController.js');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// app.use(cors());
// require('./cacheManager');
// parse application/json
app.use(cookieParser());
app.use(auth.createSession);
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'staticAssets')));

routes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	console.log('REQ==', req);
	const error = new Error('Not Found');
	console.log(error);
	error.status = 404;
	res.send('Route not found');
	next(error);
});

module.exports = app;