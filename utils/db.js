const mongoose = require("mongoose"); 
mongoose.Promise = require("bluebird"); 
const dbURI = 'mongodb://localhost:27017/';
// 'mongodb+srv://testuser:test123@cluster0.s3vuxyh.mongodb.net/PMS';
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