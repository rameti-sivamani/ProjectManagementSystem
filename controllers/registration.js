exports.register=(req,res,next)=>{
    res.render('registration.ejs',{
        path:"/register",
    });
}

exports.login=(req,res,next)=>{
    res.render('registration.ejs',{
        path:"/login",
    });
}
exports.home=(req,res,next)=>{
    res.render('index.ejs');
}