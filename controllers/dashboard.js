const dashboard={};

dashboard.home=(req,res,next)=>{
    res.render('dashboard/sidebar.ejs')
}

module.exports= dashboard;

