const express = require("express");
const app = express.Router();
const dashboard = require("../controllers/dashboard");
const project=require('../controllers/project')

//get requests
app.get('/',dashboard.home);
app.get('/create',project.createNewProject)



//post requests
app.post('/logout',dashboard.logout);
app.post('/create',project.createproject);


app.post('/:projectId/delete',project.deleteProject);
module.exports=app;