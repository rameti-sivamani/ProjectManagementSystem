const express = require("express");
const app = express.Router();
const dashboard = require("../controllers/dashboard");
const project=require('../controllers/project');
const Task=require('../controllers/task')
const auth = require("../controllers/auth");

//get requests
app.get('/',dashboard.home);
app.get('/create',project.createNewProject);
app.get('/myProjects',dashboard.myProjects);
app.get('/projects/:projectId',project.viewProject);
app.get('/teams',project.displayTeams);
app.get('/reports',project.displayReports);
app.get('/support',(req,res,next)=>{
    res.render('dashboard',
        {
            title:'Help & Support',
            path:"/dashboard/support",
            message:"",
            redirectUrl:'/dashboard'
        }
    )
})
app.get('/search',project.search);
app.get('/:projectId/edit',project.EditProject);
app.get('/profile',auth.profile);

//post requests
app.post('/logout',dashboard.logout);
app.post('/create',project.createproject);
app.post('/updatePassword',auth.updatePassword);
app.post('/:projectId/delete',project.deleteProject);
app.post('/projects/:projectId/tasks/:taskId/delete',Task.deleteTask);
app.post('/projects/:projectId/newTask',Task.createTask);
app.post('/projects/:projectId/tasks/:taskId/updateCategory',project.updateTaskCategory);


module.exports=app;