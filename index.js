const express=require("express");
const path=require("path");
const app = express();

app.set('views','views');
app.set('view engine','ejs');
app.use("/",(req,res,next)=>{
    app.render('index.ejs');
});
app.listen('3000',()=>{
    console.log("Server Running on Port 3000");
})