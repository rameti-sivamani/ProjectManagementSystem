const express=require("express");
const path=require('path');
const bodyParser=require('body-parser');
const app = express();

app.set('view engine','ejs');
app.set('views','views');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
// app.use("/",(req,res,next)=>{
//     console.log("Home");
//     res.render('index.ejs');
// });
app.use("/register",(req,res,next)=>{
    console.log("Home");
    res.render('registration.ejs');
});
app.listen('3000',()=>{
    console.log("Server Running on Port 3000");
})