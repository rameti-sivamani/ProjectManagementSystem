const mongoose = require("mongoose"); 
mongoose.Promise = require("bluebird"); 
require("dotenv").config();

const dbURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ProjectManagementSystem";
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Successfully connected to the database"); 
  })  
  .catch((error) => { 
    console.error("Error connecting to the database:", error); 
  }); 