const express=require("express");
const path=require('path');
const bodyParser=require('body-parser');
const app = express();
const normalRoutes=require('./routes/normal');

app.set('view engine','ejs');
app.set('views','views');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

//app.use('/user',userRoutes);
app.use('/',normalRoutes);

// app.use("/",(req,res,next)=>{
//     console.log("Home");
//     res.render('index.ejs');
//     next();
// });


app.listen('3000',()=>{
    console.log("Server Running on Port 3000");
})