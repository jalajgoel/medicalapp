// server/index.js
'use strict';

const app = require('./app');

var port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});
