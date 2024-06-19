const dbConfig = require("../confic/db.config.js");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url //to conform the configure with db

db.tutorials = require("./index.model.js")(mongoose);
module.exports = db;