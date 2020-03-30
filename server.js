var express = require("express"),
    mongoose = require("mongoose"),
    bodyparser = require("body-parser"),
    passport = require("passport"),
    jwt = require('jsonwebtoken'),
    sendmail = require('./mailing/authmail'),
    nodemailer = require('nodemailer'),
    LocalStrategy =require("passport-local"),
    secret = 'portal authentiaction'
    User = require("./models/user"),
    app = express();


mongoose.connect('mongodb://localhost/task-manager', {
    useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

  


// conformation route ===================
app.get("/confirm/:token", function (req, res) {
    const decoded = jwt.verify(req.params.token, secret);
    User.findOneAndUpdate({email: decoded.email},
       { confirmed: true},
      {new:true},
     function (error, success) {
           if (error) {
               console.log(error);
           } else {
               console.log(success);
           }
       });
})

// basic routes==========================
app.get("/", function (req, res) {
    res.redirect("home")
})

app.get("/home", function (req, res) {
    res.render("home")
})


//login routes==========================
app.get("/login", function (req, res) {
    res.render("login")
})



// sign up routes ======================
app.get("/signup", function (req, res) {
    res.render("signup")
})

app.post('/signup', (req, res) => {
    const user = new User(req.body)
     if(user.password !== user.confirmpassword){
         res.send("password and confirm password doesn't match")
     } 
     else{
          user.save().then(() => {
            console.log(user);
            var token = jwt.sign({
                email: user.email
              },
              secret ,
              {
                expiresIn:"1d"
              });
              sendmail(user.email,token);
              res.redirect('/home');
            
        }).catch((e) => {
            res.status(400).send(e)
        })
     }   
})

// login post route =====================
// app.post("/login",isLoggedin,(req,res)=>{
//    // still to work
// });


app.get("/dashboard", function (req, res) {
    res.render("dashboard")
})


app.listen("3000", function () {
    console.log("server has started at port 3000")
}) 
