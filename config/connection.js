const { connect, connection } = require('mongoose');
//connect to the NoSQL socialnetworkDB using mongoose
connect('mongodb://127.0.0.1:27017/socialnetworkDB');

module.exports = connection;
