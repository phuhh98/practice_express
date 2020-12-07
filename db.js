"use strict";
//lowdb
const low = require("lowdb");	//call lowdb package
const FileSync = require('lowdb/adapters/FileSync');	//call lowdb file-sync adapter
const adapter = new FileSync('db.json');	// create a file-synce adapter
const db = low(adapter);	//create a database instance

// set default state for db.json
db.defaults({users: [], products: [], sessions: []})	//inside .defaults(...) is an object literal or variable
  .write();	//write to db.json (make change to file)

module.exports = db;