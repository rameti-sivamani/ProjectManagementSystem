const Project=require('../models/Project')
const dashboard={};
const session=require('express-session')

dashboard.home=(req,res,next)=>{
    
    const products=Project.getAllProjects;
    console.log(products);
    const message = req.flash('message');
    res.render('dashboard.ejs',{
        title:'Dashboard',
        message:message
    })
    next();
}

dashboard.logout=(req,res,next)=>{
    res.clearCookie('token');
    req.flash('message',"Successfully Logged out")
    res.redirect('/?message=Successfully logged out!');

}

module.exports= dashboard;

